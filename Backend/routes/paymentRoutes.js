// // const express = require("express");
// // const router = express.Router();
// // const Razorpay = require("razorpay");

// // // 🎯 Apni Test Keys yahan daalenge (Baad me .env me daal sakte hain)
// // const razorpay = new Razorpay({
// //   key_id: "rzp_test_T78UJUOjZNbRW9", 
// //   key_secret: "aggH0XqFLp4nI0k5BwIL23Aa",
// // });

// // // 💳 Checkout Route
// // router.post("/checkout", async (req, res) => {
// //   try {
// //     const options = {
// //       amount: Number(req.body.amount) * 100, // ₹ to paise
// //       currency: "INR",
// //       receipt: "receipt_" + Math.floor(Math.random() * 10000),
// //     };

// //     const order = await razorpay.orders.create(options);
    
// //     res.json({
// //       success: true,
// //       orderId: order.id,
// //       amount: order.amount
// //     });
// //   } catch (err) {
// //     console.error("Razorpay Error:", err);
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // });

// // module.exports = router;



// // const express = require("express");
// // const router = express.Router();
// // const { Cashfree } = require("cashfree-pg");

// // // 🔑 CASHFREE CONFIGURATION SETUP
// // // 🌟 YAHA PAR AAPKO APNI ORIGINAL KEYS REPLACE KARNI HAIN
// // Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID || "1335008e340ed36ab9d364520a88005331"; 
// // Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY; // 👈 Code se key poori tarah saaf!
// // Cashfree.XEnvironment = "PRODUCTION";
// // // 💳 Checkout Route (Cashfree Version)
// // router.post("/checkout", async (req, res) => {
// //   try {
// //     const { amount, customerPhone, customerEmail } = req.body;
    
// //     // Ek unique aur dynamic order ID generate karna (Taaki duplicate order error na aaye)
// //     const uniqueOrderId = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

// //     const requestData = {
// //       order_amount: Number(amount), // Cashfree direct ₹ leta hai, *100 karne ki zaroorat nahi hai!
// //       order_currency: "INR",
// //       order_id: uniqueOrderId,
// //       customer_details: {
// //         customer_id: customerPhone ? customerPhone.toString() : "cust_" + Date.now(),
// //         customer_phone: customerPhone || "9999999999", // Fallback agar phone number na mile
// //         customer_email: customerEmail || "customer@xbihar.com", // Fallback email
// //       },
// //       order_meta: {
// //         // Payment success/fail hone ke baad user automatic is website URL par redirect ho jayega
// //         return_url: "https://xbihar.com/orders/success?order_id={order_id}"
// //       }
// //     };

// //     // 💳 Cashfree SDK v3 standard se order creation request bhejna
// //     const response = await Cashfree.PGCreateOrder("2023-08-01", requestData);
    
// //     // Frontend ko data respond karna jo aapke Next.js Checkout page ko chahiye
// //     res.json({
// //       success: true,
// //       paymentSessionId: response.data.payment_session_id,
// //       orderId: response.data.order_id,
// //       amount: response.data.order_amount
// //     });

// //   } catch (err) {
// //     console.error("Cashfree Backend Error:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       error: err.response?.data?.message || err.message 
// //     });
// //   }
// // });

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { Cashfree, CFEnvironment } = require("cashfree-pg");

// // 🔑 CASHFREE CONFIGURATION SETUP (v6 SDK ka tarika)


// // const cashfree = new Cashfree(
// //   CFEnvironment.PRODUCTION,
// //   process.env.CASHFREE_APP_ID,      // 👈 CASHFREE_CLIENT_ID ki jagah ye
// //   process.env.CASHFREE_SECRET_KEY
// // );



// // 💳 Checkout Route (Cashfree Version)
// router.post("/checkout", async (req, res) => {
//   try {
//     const { amount, customerPhone, customerEmail } = req.body;

//     const uniqueOrderId = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

//     const requestData = {
//       order_amount: Number(amount),
//       order_currency: "INR",
//       order_id: uniqueOrderId,
//       customer_details: {
//         customer_id: customerPhone ? customerPhone.toString() : "cust_" + Date.now(),
//         customer_phone: customerPhone || "9354165694", // Fallback agar phone number na mile
//         customer_email: customerEmail || "xbihar.in@gmail.com", // Fallback email
//       },
//       order_meta: {
//         return_url: "https://xbihar.com/orders/success?order_id={order_id}"
//       }
//     };

//     const response = await cashfree.PGCreateOrder(requestData);

//     res.json({
//       success: true,
//       paymentSessionId: response.data.payment_session_id,
//       orderId: response.data.order_id,
//       amount: response.data.order_amount
//     });

//   } catch (err) {
//     console.error("Cashfree Backend Error:", err);
//     res.status(500).json({
//       success: false,
//       error: err.response?.data?.message || err.message
//     });
//   }
// });

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { Cashfree, CFEnvironment } = require("cashfree-pg");

// // 🔑 CASHFREE CONFIGURATION SETUP
// const env = process.env.CASHFREE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

// const cashfree = new Cashfree(
//   env,
//   process.env.CASHFREE_APP_ID || process.env.CASHFREE_CLIENT_ID,
//   process.env.CASHFREE_SECRET_KEY
// );

// // 💳 Checkout Route (Cashfree Version)
// router.post("/checkout", async (req, res) => {
//   try {
//     const { amount, customerPhone, customerEmail, returnUrl, customerName } = req.body;

//     const uniqueOrderId = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

//     const requestData = {
//       order_amount: Number(amount),
//       order_currency: "INR",
//       order_id: uniqueOrderId,
//       customer_details: {
//         customer_id: customerPhone ? customerPhone.toString() : "cust_" + Date.now(),
//         customer_name: customerName || "Customer",
//         customer_phone: customerPhone || "9354165694",
//         customer_email: customerEmail || "xbihar.in@gmail.com",
//       },
//       order_meta: {
//         // 🚨 FIXED: Ab customer exact https://xbihar.com/orders?order_id=... par redirect hoga (404 Issue Solved)
//         return_url: returnUrl || "https://xbihar.com/orders?order_id={order_id}",
//       },
//     };

//     const response = await cashfree.PGCreateOrder(requestData);

//     res.json({
//       success: true,
//       paymentSessionId: response.data.payment_session_id,
//       orderId: response.data.order_id,
//       amount: response.data.order_amount,
//     });
//   } catch (err) {
//     console.error("Cashfree Backend Error:", err.response?.data || err.message);
//     res.status(500).json({
//       success: false,
//       error: err.response?.data?.message || err.message,
//     });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const { Cashfree, CFEnvironment } = require("cashfree-pg");

// 🔑 SAFE CASHFREE SDK INITIALIZATION
const isProduction = process.env.CASHFREE_ENV === "production";

Cashfree.XClientId = process.env.CASHFREE_APP_ID || process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

// 💳 Checkout Route
router.post("/checkout", async (req, res) => {
  try {
    const { amount, customerPhone, customerEmail, returnUrl, customerName } = req.body;

    const uniqueOrderId = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

    const requestData = {
      order_amount: Number(amount),
      order_currency: "INR",
      order_id: uniqueOrderId,
      customer_details: {
        customer_id: customerPhone ? customerPhone.toString() : "cust_" + Date.now(),
        customer_name: customerName || "Customer",
        customer_phone: customerPhone || "9354165694",
        customer_email: customerEmail || "xbihar.in@gmail.com",
      },
      order_meta: {
        return_url: returnUrl || "https://xbihar.com/orders?order_id={order_id}",
      },
    };

    // Static PGCreateOrder Call (Crash-proof)
    const response = await Cashfree.PGCreateOrder("2023-08-01", requestData);

    res.json({
      success: true,
      paymentSessionId: response.data.payment_session_id,
      orderId: response.data.order_id,
      amount: response.data.order_amount,
    });
  } catch (err) {
    console.error("Cashfree Backend Error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data?.message || err.message,
    });
  }
});

module.exports = router;
