// routes/shiprocketWebhook.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Aapka Order model path check kar lijiye ek baar

// router.post('/shiprocket-webhook', async (req, res) => {
  router.post('/order-status-update', async (req, res) => {
  try {
    const { order_id, status } = req.body;

    console.log(`📡 Shiprocket Alert! Order ID: ${order_id} ka status ab [${status}] hai.`);

    if (status.toLowerCase() === 'cancelled' || status.toLowerCase() === 'canceled') {
      const updatedOrder = await Order.findOneAndUpdate(
        { shiprocketOrderId: order_id }, 
        { status: 'Cancelled' },
        { new: true }
      );

      if (updatedOrder) {
        console.log(`✅ Database Success: Order ${order_id} ko Cancelled mark kar diya gaya.`);
      } else {
        console.log(`⚠️ Warning: Order ${order_id} database mein nahi mila.`);
      }
    }

    return res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

 
// 🎯 FIX 2: Require ke sath chalane ke liye module.exports kiya hai
module.exports = router;