
const Order = require("../models/Order");
const User = require("../models/User");
const nodemailer = require("nodemailer"); 
const { getCourierRates } = require("../services/shiprocketRates"); 

const {
  createShiprocketOrder,
} = require("../services/shiprocketService");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// 🔥 PINCODE AND WEIGHT BASED LIVE DELIVERY CHARGE CALCULATOR (STRICT MATCH WITH SHIPROCKET)
exports.calculateLiveShipping = async (req, res) => {
  try {
    const { pincode, weight } = req.body;
    if (!pincode) {
      return res.status(400).json({ success: false, message: "Pincode is required" });
    }
    
    // Direct Shiprocket actual rate matrix call
    const rateData = await getCourierRates(pincode, weight);
    
    if (rateData.success && rateData.courier) {
      // Direct exact decimal fraction response mapping
      return res.status(200).json({ 
        success: true, 
        courier: {
          charge: Number(rateData.courier.charge), // Exact Shiprocket rate + 5 rs notify fee
          name: rateData.courier.name
        }
      });
    } else {
      // Strict baseline fallback matrix agar API down ho
      const defaultCharge = weight > 0.5 ? 120 : 80;
      return res.status(200).json({ 
        success: true, 
        courier: { charge: defaultCharge, name: "Standard Secure Delivery" } 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ CREATE ORDER 
exports.createOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Login required" });
    }

    console.log("🔥 ORDER API HIT");
    const user = await User.findById(req.user.id || req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = await Order.create({
      user: user._id,
      name: req.body.name,
      email: req.body.email,
      deliveryPhone: req.body.phone,
      shippingCharge: req.body.shippingCharge, // Strict parity with frontend state
      totalPrice: req.body.totalPrice,
      shippingAddress: req.body.shippingAddress,
      shippingAddressPincode: req.body.pincode, 
      products: req.body.products.map((p) => ({
        productId: p.productId,
        title: p.title,
        price: p.price,
        image: p.image,
        quantity: p.quantity,
        size: p.size,
      })),
    });

    // SHIPROCKET CALL
    const shiprocketRes = await createShiprocketOrder(order);
    if (shiprocketRes) {
      order.shipmentId = shiprocketRes.shipment_id;
      order.courier = shiprocketRes.courier_name;
      order.trackingUrl = shiprocketRes.tracking_url;
      await order.save();
    }

    // EMAIL 1: ORDER PLACED EMAIL
    const orderPlacedMailOptions = {
      from: process.env.EMAIL_USER,
      to: order.email, 
      subject: `🚨 Drop Secured! Order Confirmed - #${order._id.toString().substring(0, 8)}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-w: 600px; border: 1px solid #222;">
          <h1 style="color: #ff0000; font-size: 24px; text-transform: uppercase;">Order Confirmed!</h1>
          <p>Hi ${order.name},</p>
          <p>Your drop has been secured successfully.</p>
          <hr style="border-color: #222;" />
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
          <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
        </div>
      `,
    };

    transporter.sendMail(orderPlacedMailOptions, (err, info) => {
      if (err) console.log("❌ Placed Email Error:", err);
    });

    res.status(201).json({
      success: true,
      order,
      shiprocket: shiprocketRes,
    });

  } catch (error) {
    console.log("❌ ORDER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ... Rest of your controller codes (getMyOrders, getOrderById, etc.) remain untouched
exports.getMyOrders = async (req, res) => { try { const orders = await Order.find({ user: req.user.id || req.user._id }).sort({ createdAt: -1 }); res.json({ success: true, orders }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
exports.getOrderById = async (req, res) => { try { const order = await Order.findById(req.params.id); if (!order) return res.status(404).json({ success: false, message: "Order not found" }); res.json(order); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
exports.getAllOrders = async (req, res) => { try { const orders = await Order.find().sort({ createdAt: -1 }); res.json(orders); } catch (error) { res.status(500).json({ message: error.message }); } };
exports.updateOrderStatus = async (req, res) => { try { const { orderStatus } = req.body; const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true }); if (!order) return res.status(404).json({ message: "Order not found" }); res.json(order); } catch (error) { res.status(500).json({ message: error.message }); } };