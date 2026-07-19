
// import express from 'express';
// import crypto from 'crypto';

// const router = express.Router();

// router.post('/razorpay-webhook', async (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//   // Razorpay ke signal ko verify karna ki yeh asli hai ya fake
//   const shasum = crypto.createHmac('sha256', secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest('hex');

//   if (digest === req.headers['x-razorpay-signature']) {
//     const event = req.body.event;
    
//     // Agar payment successful ho gayi hai
//     if (event === 'payment.captured') {
//       const orderId = req.body.payload.payment.entity.order_id;
      
//       // 📝 YAHAN AAPKA DATABASE UPDATE CODE AAYEGA:
//       // example: await Order.findOneAndUpdate({ orderId }, { status: 'Paid' });
//       console.log(`Order ${orderId} successfully marked as PAID via Webhook!`);
//     }
    
//     res.status(200).json({ status: 'ok' });
//   } else {
//     res.status(400).send('Invalid webhook signature');
//   }
// });

// export default router;


// routes/shiprocketWebhook.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = "XBIHAR <otp@xbihar.com>";

// Shiprocket ke status ko apne app ke status me map karna
const mapStatus = (shiprocketStatus) => {
  const status = shiprocketStatus.toLowerCase();
  if (status.includes("cancel")) return "Cancelled";
  if (status.includes("deliver")) return "Delivered";
  if (status.includes("out for delivery")) return "Out for Delivery";
  if (status.includes("shipped") || status.includes("pickup")) return "Shipped";
  return "Processing";
};

router.post('/shiprocket-webhook', async (req, res) => {
  try {
    const { order_id, status } = req.body;

    console.log(`📡 Shiprocket Alert! Order ID: ${order_id} ka status ab [${status}] hai.`);

    const newStatus = mapStatus(status);

    const updatedOrder = await Order.findOneAndUpdate(
      { shipmentId: order_id },
      { orderStatus: newStatus },
      { new: true }
    );

    if (updatedOrder) {
      console.log(`✅ Database Success: Order ${order_id} ko ${newStatus} mark kar diya gaya.`);

      // 📧 Customer ko notification bhejo
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: updatedOrder.email,
          subject: `Order Update: ${newStatus} - #${updatedOrder._id.toString().substring(0, 8)}`,
          html: `
            <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
              <h2 style="text-transform: uppercase;">Order Status: ${newStatus}</h2>
              <p>Hi ${updatedOrder.name},</p>
              <p>Your order <strong>#${updatedOrder._id.toString().substring(0, 8)}</strong> is now: <strong>${newStatus}</strong></p>
              ${updatedOrder.trackingUrl ? `<p><a href="${updatedOrder.trackingUrl}" style="color: #ff5555;">Track your shipment here</a></p>` : ""}
            </div>
          `,
        });
        console.log("✅ WEBHOOK STATUS EMAIL SENT");
      } catch (mailErr) {
        console.log("❌ Webhook Email Error:", mailErr);
      }
    } else {
      console.log(`⚠️ Warning: Order ${order_id} database mein nahi mila.`);
    }

    return res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;