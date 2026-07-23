



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



// const express = require("express");
// const router = express.Router();
// const { Cashfree, CFEnvironment } = require("cashfree-pg");

// // 🔑 SAFE CASHFREE SDK INITIALIZATION
// const isProduction = process.env.CASHFREE_ENV === "production";

// Cashfree.XClientId = process.env.CASHFREE_APP_ID || process.env.CASHFREE_CLIENT_ID;
// Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
// Cashfree.XEnvironment = isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

// // 💳 Checkout Route
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
//         return_url: returnUrl || "https://xbihar.com/orders?order_id={order_id}",
//       },
//     };

//     // Static PGCreateOrder Call (Crash-proof)
//     const response = await Cashfree.PGCreateOrder("2023-08-01", requestData);

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
const { Cashfree } = require("cashfree-pg");

// 🔑 CASHFREE V3 SDK SETUP
Cashfree.XClientId = process.env.CASHFREE_APP_ID || process.env.CASHFREE_CLIENT_ID || "";
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY || "";
Cashfree.XEnvironment = process.env.CASHFREE_ENV === "production" ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;

// 💳 CHECKOUT ROUTE
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
  return_url: req.body.returnUrl || "https://xbihar.com/success?order_id={order_id}"
}
    };

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