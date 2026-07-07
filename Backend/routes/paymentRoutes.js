const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

// 🎯 Apni Test Keys yahan daalenge (Baad me .env me daal sakte hain)
const razorpay = new Razorpay({
  key_id: "rzp_test_T78UJUOjZNbRW9", 
  key_secret: "aggH0XqFLp4nI0k5BwIL23Aa",
});

// 💳 Checkout Route
router.post("/checkout", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100, // ₹ to paise
      currency: "INR",
      receipt: "receipt_" + Math.floor(Math.random() * 10000),
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount
    });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;