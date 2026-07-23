
// const Order = require("../models/Order");
// const User = require("../models/User");
// const nodemailer = require("nodemailer"); 
// const axios = require("axios"); // ⚡ Cashfree API hits ke liye zaroori hai
// const { getCourierRates } = require("../services/shiprocketRates"); 

// const {
//   createShiprocketOrder,
// } = require("../services/shiprocketService");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   },
// });

// // 🔥 PINCODE AND WEIGHT BASED LIVE DELIVERY CHARGE CALCULATOR
// exports.calculateLiveShipping = async (req, res) => {
//   try {
//     const { pincode, weight } = req.body;
//     if (!pincode) {
//       return res.status(400).json({ success: false, message: "Pincode is required" });
//     }
    
//     const rateData = await getCourierRates(pincode, weight);
    
//     if (rateData.success && rateData.courier) {
//       return res.status(200).json({ 
//         success: true, 
//         courier: {
//           charge: Number(rateData.courier.charge),
//           name: rateData.courier.name
//         }
//       });
//     } else {
//       const defaultCharge = weight > 0.5 ? 120 : 80;
//       return res.status(200).json({ 
//         success: true, 
//         courier: { charge: defaultCharge, name: "Standard Secure Delivery" } 
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ STEP 1: INITIALIZE CASHFREE ORDER (Payment link generator)
// exports.createOrder = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Login required" });
//     }

//     console.log("🔥 CASHFREE ORDER API HIT - MATCHED WITH MODEL SCHEMA");
//     const user = await User.findById(req.user.id || req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const customOrderId = `ORD_${Date.now()}`;
    
//     // ⚡ Mapped exactly with your nested address & fields schema
//     const order = await Order.create({
//       user: user._id,
//       name: req.body.name,
//       email: req.body.email,
//       deliveryPhone: req.body.phone,
//       shippingCharge: req.body.shippingCharge,
//       totalPrice: req.body.totalPrice,
//       paymentStatus: "pending", // Schema default lower-case consistency
//       cfOrderId: customOrderId,
      
//       // 📦 Nested Address validation mapping
//       shippingAddress: {
//         address: req.body.address,
//         city: req.body.city,
//         state: req.body.state,
//         pincode: req.body.pincode,
//       },
//       shippingAddressPincode: req.body.pincode,
      
//       products: req.body.products.map((p) => ({
//         product: p.productId, // Mapped to reference internal ID key pointer
//         productId: p.productId,
//         title: p.title,
//         price: p.price,
//         image: p.image,
//         quantity: p.quantity,
//         size: p.size,
//       })),
//     });

//     // 2. Cashfree Live/Sandbox Endpoint Engine configuration
//     const cashfreeEnv = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";
//     const cashfreeResponse = await axios.post(
//       `https://${cashfreeEnv}.cashfree.com/pg/orders`,
//       {
//         order_amount: Number(req.body.totalPrice),
//         order_currency: "INR",
//         order_id: customOrderId,
//         customer_details: {
//           customer_id: user._id.toString(),
//           customer_phone: req.body.phone,
//           customer_email: req.body.email,
//         },
//        order_meta: {
//   // ⚡ Aapki real website ka success status page redirection route
//   return_url: `https://xbihar.com/orders/success?order_id=${customOrderId}`,
// }
//       },
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01",
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     // Frontend layout handler verification callback payloads
//     return res.status(201).json({
//       success: true,
//       payment_session_id: cashfreeResponse.data.payment_session_id,
//       orderId: order._id,
//       cfOrderId: customOrderId
//     });

//   } catch (error) {
//     console.log("❌ CASHFREE ORDER ERROR:", error.response?.data || error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ STEP 2: VERIFY PAYMENT status (User ke payment complete karne ke baad hit hoga)
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { cfOrderId } = req.body;
    
//     const order = await Order.findOne({ cfOrderId });
//     if (!order) return res.status(404).json({ success: false, message: "Order records not found" });

//     const cashfreeEnv = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";
    
//     const verifyRes = await axios.get(
//       `https://${cashfreeEnv}.cashfree.com/pg/orders/${cfOrderId}`,
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01"
//         }
//       }
//     );

//     if (verifyRes.data.order_status === "PAID") {
//       order.paymentStatus = "Paid";
      
//       // 🚀 SHIPROCKET LOGIC EXECUTED
//       const shiprocketRes = await createShiprocketOrder(order);
//       if (shiprocketRes) {
//         order.shipmentId = shiprocketRes.shipment_id;
//         order.courier = shiprocketRes.courier_name;
//         order.trackingUrl = shiprocketRes.tracking_url;
//       }
      
//       await order.save();

//       // 📧 NODEMAILER AUTOMATION TRIGGER WITH FORMATTED NESTED DATA
//       const orderPlacedMailOptions = {
//         from: process.env.EMAIL_USER,
//         to: order.email, 
//         subject: `🚨 Drop Secured! Order Confirmed - #${order._id.toString().substring(0, 8)}`,
//         html: `
//           <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-w: 600px; border: 1px solid #222;">
//             <h1 style="color: #ff0000; font-size: 24px; text-transform: uppercase;">Order Confirmed!</h1>
//             <p>Hi ${order.name},</p>
//             <p>Your drop has been secured successfully via secure transaction.</p>
//             <hr style="border-color: #222;" />
//             <p><strong>Order ID:</strong> ${order._id}</p>
//             <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
//             <p><strong>Shipping Address:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
//           </div>
//         `,
//       };

//       transporter.sendMail(orderPlacedMailOptions, (err, info) => {
//         if (err) console.log("❌ Placed Email Error:", err);
//       });

//       return res.status(200).json({ success: true, message: "Payment verified, order captured!", order });
//     } else {
//       return res.status(400).json({ success: false, message: "Payment not completed or failed" });
//     }

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ... Rest of your controller codes remain untouched
// exports.getMyOrders = async (req, res) => { try { const orders = await Order.find({ user: req.user.id || req.user._id }).sort({ createdAt: -1 }); res.json({ success: true, orders }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
// exports.getOrderById = async (req, res) => { try { const order = await Order.findById(req.params.id); if (!order) return res.status(404).json({ success: false, message: "Order not found" }); res.json(order); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
// exports.getAllOrders = async (req, res) => { try { const orders = await Order.find().sort({ createdAt: -1 }); res.json(orders); } catch (error) { res.status(500).json({ message: error.message }); } };
// exports.updateOrderStatus = async (req, res) => { try { const { orderStatus } = req.body; const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true }); if (!order) return res.status(404).json({ message: "Order not found" }); res.json(order); } catch (error) { res.status(500).json({ message: error.message }); } };





// const Order = require("../models/Order");
// const User = require("../models/User");
// const nodemailer = require("nodemailer"); 
// const axios = require("axios"); // ⚡ Cashfree API status verification ke liye
// const { getCourierRates } = require("../services/shiprocketRates"); 

// const {
//   createShiprocketOrder,
// } = require("../services/shiprocketService");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   },
// });

// // 🔥 PINCODE AND WEIGHT BASED LIVE DELIVERY CHARGE CALCULATOR
// exports.calculateLiveShipping = async (req, res) => {
//   try {
//     const { pincode, weight } = req.body;
//     if (!pincode) {
//       return res.status(400).json({ success: false, message: "Pincode is required" });
//     }
    
//     const rateData = await getCourierRates(pincode, weight);
    
//     if (rateData.success && rateData.courier) {
//       return res.status(200).json({ 
//         success: true, 
//         courier: {
//           charge: Number(rateData.courier.charge),
//           name: rateData.courier.name
//         }
//       });
//     } else {
//       const defaultCharge = weight > 0.5 ? 120 : 80;
//       return res.status(200).json({ 
//         success: true, 
//         courier: { charge: defaultCharge, name: "Standard Secure Delivery" } 
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ CREATE ORDER ROUTE (Saves order right after successful payment callback)
// exports.createOrder = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Login required" });
//     }

//     console.log("🔥 CASHFREE DATABASE LOGGING API HIT - SYNCED WITH FRONTEND");
//     const user = await User.findById(req.user.id || req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Direct database entry with marked status 'Paid' because frontend hits this only on redirect success
//     const order = await Order.create({
//       user: user._id,
//       name: req.body.name,
//       email: req.body.email,
//       deliveryPhone: req.body.phone,
//       shippingCharge: req.body.shippingCharge,
//       totalPrice: req.body.totalPrice,
//       paymentStatus: "Paid", // Confirmed payment mark
//       cfOrderId: req.body.cashfreeOrderId, // Syncs with frontend proof identifier
      
//       shippingAddress: {
//         address: req.body.shippingAddress?.address || req.body.address,
//         city: req.body.shippingAddress?.city || req.body.city,
//         state: req.body.shippingAddress?.state || req.body.state,
//         pincode: req.body.shippingAddress?.pincode || req.body.pincode,
//       },
//       shippingAddressPincode: req.body.shippingAddress?.pincode || req.body.pincode,
      
//       products: req.body.products.map((p) => ({
//         product: p.productId, 
//         productId: p.productId,
//         title: p.title,
//         price: p.price,
//         image: p.image,
//         quantity: p.quantity,
//         size: p.size,
//       })),
//     });

//     // 🚀 SHIPROCKET SYNCHRONIZATION
//     const shiprocketRes = await createShiprocketOrder(order);
//     if (shiprocketRes) {
//       order.shipmentId = shiprocketRes.shipment_id;
//       order.courier = shiprocketRes.courier_name;
//       order.trackingUrl = shiprocketRes.tracking_url;
//       await order.save();
//     }

//     // 📧 NODEMAILER ORDER DISPATCH SUCCESS TRIGGER
//     const orderPlacedMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: order.email, 
//       subject: `🚨 Drop Secured! Order Confirmed - #${order._id.toString().substring(0, 8)}`,
//       html: `
//         <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-w: 600px; border: 1px solid #222;">
//           <h1 style="color: #ff0000; font-size: 24px; text-transform: uppercase;">Order Confirmed!</h1>
//           <p>Hi ${order.name},</p>
//           <p>Your drop has been secured successfully via secure transaction.</p>
//           <hr style="border-color: #222;" />
//           <p><strong>Order ID:</strong> ${order._id}</p>
//           <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
//           <p><strong>Shipping Address:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
//         </div>
//       `,
//     };

//     transporter.sendMail(orderPlacedMailOptions, (err, info) => {
//       if (err) console.log("❌ Placed Email Error:", err);
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Order processed and logged successfully!",
//       order,
//       shiprocket: shiprocketRes
//     });

//   } catch (error) {
//     console.log("❌ DATABASE ORDER LOGGER ERROR:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ STEP 2: BACKUP PAYMENT VERIFICATION (Syncs both frontend tracking schemes)
// exports.verifyPayment = async (req, res) => {
//   try {
//     const cfOrderId = req.body.cashfreeOrderId || req.body.cfOrderId; 
    
//     const order = await Order.findOne({ cfOrderId });
//     if (!order) return res.status(404).json({ success: false, message: "Order records not found" });

//     const cashfreeEnv = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";
    
//     const verifyRes = await axios.get(
//       `https://${cashfreeEnv}.cashfree.com/pg/orders/${cfOrderId}`,
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01"
//         }
//       }
//     );

//     if (verifyRes.data.order_status === "PAID") {
//       order.paymentStatus = "Paid";
//       await order.save();
//       return res.status(200).json({ success: true, message: "Payment verified!", order });
//     } else {
//       return res.status(400).json({ success: false, message: "Payment not completed or failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ... Rest of your controller codes remain untouched
// exports.getMyOrders = async (req, res) => { try { const orders = await Order.find({ user: req.user.id || req.user._id }).sort({ createdAt: -1 }); res.json({ success: true, orders }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
// exports.getOrderById = async (req, res) => { try { const order = await Order.findById(req.params.id); if (!order) return res.status(404).json({ success: false, message: "Order not found" }); res.json(order); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
// exports.getAllOrders = async (req, res) => { try { const orders = await Order.find().sort({ createdAt: -1 }); res.json(orders); } catch (error) { res.status(500).json({ message: error.message }); } };
// exports.updateOrderStatus = async (req, res) => { try { const { orderStatus } = req.body; const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true }); if (!order) return res.status(404).json({ message: "Order not found" }); res.json(order); } catch (error) { res.status(500).json({ message: error.message }); } };







// const Order = require("../models/Order");
// const User = require("../models/User");
// const axios = require("axios"); // ⚡ Cashfree API status verification ke liye
// const { getCourierRates } = require("../services/shiprocketRates");
// const { Resend } = require("resend");
// const {
//   createShiprocketOrder,
// } = require("../services/shiprocketService");

// const resend = new Resend(process.env.RESEND_API_KEY);
// const SENDER_EMAIL = "XBIHAR <otp@xbihar.com>";

// // 🔥 PINCODE AND WEIGHT BASED LIVE DELIVERY CHARGE CALCULATOR
// exports.calculateLiveShipping = async (req, res) => {
//   try {
//     const { pincode, weight } = req.body;
//     if (!pincode) {
//       return res.status(400).json({ success: false, message: "Pincode is required" });
//     }

//     const rateData = await getCourierRates(pincode, weight);

//     if (rateData.success && rateData.courier) {
//       return res.status(200).json({
//         success: true,
//         courier: {
//           charge: Number(rateData.courier.charge),
//           name: rateData.courier.name
//         }
//       });
//     } else {
//       const defaultCharge = weight > 0.5 ? 120 : 80;
//       return res.status(200).json({
//         success: true,
//         courier: { charge: defaultCharge, name: "Standard Secure Delivery" }
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ CREATE ORDER ROUTE (Saves order right after successful payment callback)
// exports.createOrder = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Login required" });
//     }

//     console.log("🔥 CASHFREE DATABASE LOGGING API HIT - SYNCED WITH FRONTEND");
//     const user = await User.findById(req.user.id || req.user._id);

//     const cfOrderId = req.body.cashfreeOrderId || req.body.cfOrderId || req.body.orderId;

// // Agar order pehle se database mein hai toh dobara duplicate mat banao
// let existingOrder = await Order.findOne({ cfOrderId });
// if (existingOrder) {
//   return res.status(200).json({
//     success: true,
//     message: "Order already exists in database",
//     order: existingOrder,
//   });
// }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Direct database entry with marked status 'Paid' because frontend hits this only on redirect success
//     const order = await Order.create({
//       user: user._id,
//       name: req.body.name,
//       email: req.body.email,
//       deliveryPhone: req.body.phone,
//       shippingCharge: req.body.shippingCharge,
//       totalPrice: req.body.totalPrice,
//       paymentStatus: "Paid", // Confirmed payment mark
//       cfOrderId: req.body.cashfreeOrderId, // Syncs with frontend proof identifier

//       shippingAddress: {
//         address: req.body.shippingAddress?.address || req.body.address,
//         city: req.body.shippingAddress?.city || req.body.city,
//         state: req.body.shippingAddress?.state || req.body.state,
//         pincode: req.body.shippingAddress?.pincode || req.body.pincode,
//       },
//       shippingAddressPincode: req.body.shippingAddress?.pincode || req.body.pincode,

//       products: req.body.products.map((p) => ({
//         product: p.productId,
//         productId: p.productId,
//         title: p.title,
//         price: p.price,
//         image: p.image,
//         quantity: p.quantity,
//         size: p.size,
//       })),
//     });

//     // 🚀 SHIPROCKET SYNCHRONIZATION
//     const shiprocketRes = await createShiprocketOrder(order);
//     if (shiprocketRes) {
//       order.shipmentId = shiprocketRes.shipment_id;
//       order.courier = shiprocketRes.courier_name;
//       order.trackingUrl = shiprocketRes.tracking_url;
//       await order.save();
//     }

//     // 📧 ORDER CONFIRMATION EMAIL (Resend)
//     try {
//       await resend.emails.send({
//         from: SENDER_EMAIL,
//         to: order.email,
//         subject: `Order Confirmed - #${order._id.toString().substring(0, 8)}`,
//         html: `
//           <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
//             <h1 style="color: #ff0000; font-size: 24px; text-transform: uppercase;">Order Confirmed!</h1>
//             <p>Hi ${order.name},</p>
//             <p>Your order has been placed successfully.</p>
//             <hr style="border-color: #222;" />
//             <p><strong>Order ID:</strong> ${order._id}</p>
//             <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
//             <p><strong>Shipping Address:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
//             ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color: #ff5555;">Track your shipment here</a></p>` : ""}
//             <p>You can also track this order anytime from your account's "My Orders" section.</p>
//           </div>
//         `,
//       });
//       console.log("✅ ORDER PLACED EMAIL SENT");
//     } catch (mailErr) {
//       console.log("❌ Order Placed Email Error:", mailErr);
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Order processed and logged successfully!",
//       order,
//       shiprocket: shiprocketRes
//     });

//   } catch (error) {
//     console.log("❌ DATABASE ORDER LOGGER ERROR:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ STEP 2: BACKUP PAYMENT VERIFICATION (Syncs both frontend tracking schemes)
// exports.verifyPayment = async (req, res) => {
//   try {
//     // const cfOrderId = req.body.cashfreeOrderId || req.body.cfOrderId;

// // Frontend se aane wale orderId ko flexible support karne ke liye
// const cfOrderId = req.body.orderId || req.body.cashfreeOrderId || req.body.cfOrderId;

// if (!cfOrderId) {
//   return res.status(400).json({ success: false, message: "Order ID missing" });
// }

//     const order = await Order.findOne({ cfOrderId });
//     if (!order) return res.status(404).json({ success: false, message: "Order records not found" });

//     const cashfreeEnv = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";

//     const verifyRes = await axios.get(
//       `https://${cashfreeEnv}.cashfree.com/pg/orders/${cfOrderId}`,
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01"
//         }
//       }
//     );

//     if (verifyRes.data.order_status === "PAID") {
//       order.paymentStatus = "Paid";
//       await order.save();
//       return res.status(200).json({ success: true, message: "Payment verified!", order });
//     } else {
//       return res.status(400).json({ success: false, message: "Payment not completed or failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ GET LOGGED-IN USER'S ORDERS
// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id || req.user._id }).sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ GET SINGLE ORDER BY ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ ADMIN: GET ALL ORDERS
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ ADMIN: UPDATE ORDER STATUS (+ notify customer via email)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;
//     const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // 📧 STATUS UPDATE EMAIL (Resend)
//     try {
//       await resend.emails.send({
//         from: SENDER_EMAIL,
//         to: order.email,
//         subject: `Order Update: ${orderStatus} - #${order._id.toString().substring(0, 8)}`,
//         html: `
//           <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
//             <h2 style="text-transform: uppercase;">Order Status: ${orderStatus}</h2>
//             <p>Hi ${order.name},</p>
//             <p>Your order <strong>#${order._id.toString().substring(0, 8)}</strong> is now: <strong>${orderStatus}</strong></p>
//             ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color: #ff5555;">Track your shipment here</a></p>` : ""}
//           </div>
//         `,
//       });
//       console.log("✅ STATUS UPDATE EMAIL SENT");
//     } catch (mailErr) {
//       console.log("❌ Status Update Email Error:", mailErr);
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




const Order = require("../models/Order");
const User = require("../models/User");
const axios = require("axios"); // ⚡ Cashfree API status verification ke liye
const { getCourierRates } = require("../services/shiprocketRates");
const { Resend } = require("resend");
const { createShiprocketOrder } = require("../services/shiprocketService");

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = "XBIHAR <otp@xbihar.com>";

// 🔥 PINCODE AND WEIGHT BASED LIVE DELIVERY CHARGE CALCULATOR
exports.calculateLiveShipping = async (req, res) => {
  try {
    const { pincode, weight } = req.body;
    if (!pincode) {
      return res.status(400).json({ success: false, message: "Pincode is required" });
    }

    const rateData = await getCourierRates(pincode, weight);

    if (rateData.success && rateData.courier) {
      return res.status(200).json({
        success: true,
        courier: {
          charge: Number(rateData.courier.charge),
          name: rateData.courier.name,
        },
      });
    } else {
      const defaultCharge = weight > 0.5 ? 120 : 80;
      return res.status(200).json({
        success: true,
        courier: { charge: defaultCharge, name: "Standard Secure Delivery" },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ CREATE ORDER ROUTE (Saves order right after successful payment callback)
exports.createOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Login required" });
    }

    console.log("🔥 CASHFREE DATABASE LOGGING API HIT - SYNCED WITH FRONTEND");
    const user = await User.findById(req.user.id || req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cfOrderId = req.body.cashfreeOrderId || req.body.cfOrderId || req.body.orderId;

    // 🚨 DUPLICATE GUARD: Agar order pehle se database mein hai toh dobara mat banao
    if (cfOrderId) {
      let existingOrder = await Order.findOne({ cfOrderId });
      if (existingOrder) {
        return res.status(200).json({
          success: true,
          message: "Order already exists in database",
          order: existingOrder,
        });
      }
    }

    // Direct database entry with marked status 'Paid'
    const order = await Order.create({
      user: user._id,
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      deliveryPhone: req.body.phone || user.phone,
      shippingCharge: req.body.shippingCharge || 0,
      totalPrice: req.body.totalPrice,
      paymentStatus: "Paid", // Confirmed payment mark
      cfOrderId: cfOrderId,

      shippingAddress: {
        address: req.body.shippingAddress?.address || req.body.address,
        city: req.body.shippingAddress?.city || req.body.city,
        state: req.body.shippingAddress?.state || req.body.state,
        pincode: req.body.shippingAddress?.pincode || req.body.pincode,
      },
      shippingAddressPincode: req.body.shippingAddress?.pincode || req.body.pincode,

      products: (req.body.products || []).map((p) => ({
        product: p.productId,
        productId: p.productId,
        title: p.title,
        price: p.price,
        image: p.image,
        quantity: p.quantity,
        size: p.size,
      })),
    });

    // 🚀 SHIPROCKET SYNCHRONIZATION
    try {
      const shiprocketRes = await createShiprocketOrder(order);
      if (shiprocketRes) {
        order.shipmentId = shiprocketRes.shipment_id;
        order.courier = shiprocketRes.courier_name;
        order.trackingUrl = shiprocketRes.tracking_url;
        await order.save();
      }
    } catch (srErr) {
      console.log("❌ Shiprocket Sync Warning:", srErr.message);
    }

    // 📧 ORDER CONFIRMATION EMAIL (Resend)
    try {
      await resend.emails.send({
        from: SENDER_EMAIL,
        to: order.email,
        subject: `Order Confirmed - #${order._id.toString().substring(0, 8)}`,
        html: `
          <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
            <h1 style="color: #ff0000; font-size: 24px; text-transform: uppercase;">Order Confirmed!</h1>
            <p>Hi ${order.name},</p>
            <p>Your order has been placed successfully.</p>
            <hr style="border-color: #222;" />
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
            <p><strong>Shipping Address:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
            ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color: #ff5555;">Track your shipment here</a></p>` : ""}
            <p>You can also track this order anytime from your account's "My Orders" section.</p>
          </div>
        `,
      });
      console.log("✅ ORDER PLACED EMAIL SENT");
    } catch (mailErr) {
      console.log("❌ Order Placed Email Error:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Order processed and logged successfully!",
      order,
    });
  } catch (error) {
    console.log("❌ DATABASE ORDER LOGGER ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ STEP 2: BACKUP PAYMENT VERIFICATION (BULLETPROOF CASHFREE CHECK)
exports.verifyPayment = async (req, res) => {
  try {
    // Frontend se aane wale kisi bhi key (orderId / cashfreeOrderId / cfOrderId) ko support karega
    const cfOrderId = req.body.orderId || req.body.cashfreeOrderId || req.body.cfOrderId;

    if (!cfOrderId) {
      return res.status(400).json({ success: false, message: "Order ID is missing" });
    }

    const cashfreeEnv = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";

    // Cashfree official API verification
    const verifyRes = await axios.get(
      `https://${cashfreeEnv}.cashfree.com/pg/orders/${cfOrderId}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      }
    );

    if (verifyRes.data && verifyRes.data.order_status === "PAID") {
      let order = await Order.findOne({ cfOrderId });

      if (order) {
        order.paymentStatus = "Paid";
        await order.save();
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully!",
        order_status: "PAID",
        order,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment not completed or failed on Cashfree",
      });
    }
  } catch (error) {
    console.log("❌ PAYMENT VERIFY ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET LOGGED-IN USER'S ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id || req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET SINGLE ORDER BY ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ ADMIN: GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ ADMIN: UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADMIN: UPDATE ORDER STATUS (+ notify customer via email)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;
//     const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // 📧 STATUS UPDATE EMAIL (Resend)
//     try {
//       await resend.emails.send({
//         from: SENDER_EMAIL,
//         to: order.email,
//         subject: `Order Update: ${orderStatus} - #${order._id.toString().substring(0, 8)}`,
//         html: `
//           <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
//             <h2 style="text-transform: uppercase;">Order Status: ${orderStatus}</h2>
//             <p>Hi ${order.name},</p>
//             <p>Your order <strong>#${order._id.toString().substring(0, 8)}</strong> is now: <strong>${orderStatus}</strong></p>
//             ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color: #ff5555;">Track your shipment here</a></p>` : ""}
//           </div>
//         `,
//       });
//       console.log("✅ STATUS UPDATE EMAIL SENT");
//     } catch (mailErr) {
//       console.log("❌ Status Update Email Error:", mailErr.message);
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// 🆕 NAYA FUNCTION — payment verify karke order banata hai
exports.verifyAndCreateOrder = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Login required" });

    const cfOrderId = req.body.cashfreeOrderId;
    if (!cfOrderId) return res.status(400).json({ success: false, message: "cashfreeOrderId required" });

    const existing = await Order.findOne({ cfOrderId });
    if (existing) {
      return res.status(200).json({ success: true, message: "Already recorded", order: existing });
    }

    const cashfreeEnv = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";
    const verifyRes = await axios.get(
      `https://${cashfreeEnv}.cashfree.com/pg/orders/${cfOrderId}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      }
    );

    if (verifyRes.data.order_status !== "PAID") {
      return res.status(400).json({ success: false, message: "Payment not completed yet" });
    }

    const user = await User.findById(req.user._id || req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const order = await Order.create({
      user: user._id,
      name: req.body.name,
      email: req.body.email,
      deliveryPhone: req.body.phone,
      shippingCharge: req.body.shippingCharge,
      totalPrice: req.body.totalPrice,
      paymentStatus: "Paid",
      cfOrderId,
      shippingAddress: {
        address: req.body.shippingAddress?.address,
        city: req.body.shippingAddress?.city,
        state: req.body.shippingAddress?.state,
        pincode: req.body.shippingAddress?.pincode,
      },
      shippingAddressPincode: req.body.shippingAddress?.pincode,
      products: req.body.products.map((p) => ({
        product: p.productId,
        productId: p.productId,
        title: p.title,
        price: p.price,
        image: p.image,
        quantity: p.quantity,
        size: p.size,
      })),
    });

    let shiprocketRes = null;
    try {
      shiprocketRes = await createShiprocketOrder(order);
      if (shiprocketRes) {
        order.shipmentId = shiprocketRes.shipment_id;
        order.courier = shiprocketRes.courier_name;
        order.trackingUrl = shiprocketRes.tracking_url;
        await order.save();
      }
    } catch (srErr) {
      console.log("❌ SHIPROCKET SYNC ERROR:", srErr.message);
    }

    try {
      await resend.emails.send({
        from: SENDER_EMAIL,
        to: order.email,
        subject: `Order Confirmed - #${order._id.toString().substring(0, 8)}`,
        html: `
          <div style="background-color:#000;color:#fff;padding:30px;font-family:sans-serif;max-width:600px;border:1px solid #222;">
            <h1 style="color:#ff0000;font-size:24px;text-transform:uppercase;">Order Confirmed!</h1>
            <p>Hi ${order.name},</p>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
            ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color:#ff5555;">Track your shipment here</a></p>` : ""}
          </div>
        `,
      });
    } catch (mailErr) {
      console.log("❌ Email Error:", mailErr);
    }

    return res.status(201).json({ success: true, order, shiprocket: shiprocketRes });
  } catch (error) {
    console.log("❌ VERIFY & CREATE ORDER ERROR:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};