// // routes/shiprocketWebhook.js
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order'); // Aapka Order model path check kar lijiye ek baar

// // router.post('/shiprocket-webhook', async (req, res) => {
//   router.post('/order-status-update', async (req, res) => {
//   try {
//     const { order_id, status } = req.body;

//     console.log(`📡 Shiprocket Alert! Order ID: ${order_id} ka status ab [${status}] hai.`);

//     if (status.toLowerCase() === 'cancelled' || status.toLowerCase() === 'canceled') {
//       const updatedOrder = await Order.findOneAndUpdate(
//         { shiprocketOrderId: order_id }, 
//         { status: 'Cancelled' },
//         { new: true }
//       );

//       if (updatedOrder) {
//         console.log(`✅ Database Success: Order ${order_id} ko Cancelled mark kar diya gaya.`);
//       } else {
//         console.log(`⚠️ Warning: Order ${order_id} database mein nahi mila.`);
//       }
//     }

//     return res.status(200).json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

 
// // 🎯 FIX 2: Require ke sath chalane ke liye module.exports kiya hai
// module.exports = router;




// routes/shiprocketWebhook.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = "XBIHAR <otp@xbihar.com>";

// Shiprocket ke status ko apne app ke status me map karna
const mapStatus = (shiprocketStatus) => {
  if (!shiprocketStatus) return "Processing";
  const status = shiprocketStatus.toLowerCase();
  if (status.includes("cancel")) return "Cancelled";
  if (status.includes("deliver")) return "Delivered";
  if (status.includes("out for delivery")) return "Out for Delivery";
  if (status.includes("shipped") || status.includes("pickup")) return "Shipped";
  return "Processing";
};

// router.post('/order-status-update', async (req, res) => {
//   try {
//     const { order_id, status } = req.body;

//     console.log(`📡 Shiprocket Alert! Order ID: ${order_id} ka status ab [${status}] hai.`);

//     if (!order_id || !status) {
//       // Test payload ya incomplete data — bas acknowledge kar do
//       return res.status(200).json({ success: true, message: "Test webhook received" });
//     }

//     const newStatus = mapStatus(status);

//     const updatedOrder = await Order.findOneAndUpdate(
//       { shipmentId: order_id },
//       { orderStatus: newStatus },
//       { new: true }
//     );

//     if (updatedOrder) {
//       console.log(`✅ Database Success: Order ${order_id} ko ${newStatus} mark kar diya gaya.`);

//       try {
//         await resend.emails.send({
//           from: SENDER_EMAIL,
//           to: updatedOrder.email,
//           subject: `Order Update: ${newStatus} - #${updatedOrder._id.toString().substring(0, 8)}`,
//           html: `
//             <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
//               <h2 style="text-transform: uppercase;">Order Status: ${newStatus}</h2>
//               <p>Hi ${updatedOrder.name},</p>
//               <p>Your order <strong>#${updatedOrder._id.toString().substring(0, 8)}</strong> is now: <strong>${newStatus}</strong></p>
//               ${updatedOrder.trackingUrl ? `<p><a href="${updatedOrder.trackingUrl}" style="color: #ff5555;">Track your shipment here</a></p>` : ""}
//             </div>
//           `,
//         });
//         console.log("✅ WEBHOOK STATUS EMAIL SENT");
//       } catch (mailErr) {
//         console.log("❌ Webhook Email Error:", mailErr);
//       }
//     } else {
//       console.log(`⚠️ Warning: Order ${order_id} database mein nahi mila.`);
//     }

//     return res.status(200).json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error);
//     return res.status(200).json({ success: true, message: "Webhook received with error, logged" });
//   }
// });

router.post('/order-status-update', async (req, res) => {
  try {
    const { order_id, status } = req.body;

    console.log(`📡 Shiprocket Alert! Order ID: ${order_id} ka status ab [${status}] hai. Full body:`, req.body);

    if (!order_id || !status) {
      return res.status(200).json({ success: true, message: "Test webhook received" });
    }

    const newStatus = mapStatus(status);

    // 🆕 Pehle shipmentId se try karo
    let updatedOrder = await Order.findOneAndUpdate(
      { shipmentId: order_id },
      { orderStatus: newStatus },
      { new: true }
    );

    // 🆕 Agar wo na mile, to apne Mongo _id se try karo (Shiprocket ko yahi diya tha humne)
    if (!updatedOrder) {
      try {
        updatedOrder = await Order.findOneAndUpdate(
          { _id: order_id },
          { orderStatus: newStatus },
          { new: true }
        );
      } catch (e) {
        // order_id valid ObjectId nahi hai to yahan chup-chap ignore karo
      }
    }

    if (updatedOrder) {
      console.log(`✅ Database Success: Order ${updatedOrder._id} ko ${newStatus} mark kar diya gaya.`);
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
      console.log(`⚠️ Warning: Order ${order_id} database mein kisi bhi field se nahi mila.`);
    }

    return res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(200).json({ success: true, message: "Webhook received with error, logged" });
  }
});

module.exports = router;