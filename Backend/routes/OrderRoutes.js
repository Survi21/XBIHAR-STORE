




// const express = require("express");

// const router = express.Router();

// const protect =
// require("../middleware/authMiddleware");
// const admin =
// require("../middleware/adminMiddleware");


// const {
//   getCourierRates,
// } = require("../services/shiprocketRates");

// // const {
// //   createGuestOrder,
// //   createOrder,
// //   getMyOrders,
// //   getOrderById,
// //   getAllOrders,
// // updateOrderStatus
// // } = require("../controllers/orderController");
// const {
//   createGuestOrder,
//   createOrder,
//   verifyAndCreateOrder,
//   getMyOrders,
//   getOrderById,
//   getAllOrders,
//   updateOrderStatus
// } = require("../controllers/orderController");

// router.post("/", protect, createOrder);

// router.get("/admin", protect, admin, getAllOrders);

// router.put(
//   "/:id/status",
//   protect,
//   admin,
//   updateOrderStatus
// );

// router.post("/", protect, createOrder);
// router.post("/verify", protect, verifyAndCreateOrder);

// router.get("/myorders", protect, getMyOrders);

// router.get("/:id", protect, getOrderById);



// router.post("/shipping/rates", async (req, res) => {
//   const { pincode } = req.body;

//   const result = await getCourierRates(pincode);

//   res.json(result);
// });


// module.exports = router;




const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { getCourierRates } = require("../services/shiprocketRates");

const {
  createGuestOrder,
  createOrder,
  verifyAndCreateOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus, // 👈 Make sure ye controller mein exported ho
} = require("../controllers/orderController");

// 1. Create Normal Order
router.post("/", protect, createOrder);

// 2. Payment Verify & Auto Order Creation
router.post("/verify", protect, verifyAndCreateOrder);
router.post("/verify-and-create", protect, verifyAndCreateOrder);

// 3. User Orders & Specific Order Fetching
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// 4. Admin Routes
if (getAllOrders) {
  router.get("/admin", protect, admin, getAllOrders);
}

// 🚨 Main Fix: Safeguard check taaki undefined handler ki wajah se app crash na ho
if (typeof updateOrderStatus === "function") {
  router.put("/:id/status", protect, admin, updateOrderStatus);
} else {
  router.put("/:id/status", protect, admin, (req, res) => {
    res.status(500).json({ message: "updateOrderStatus function missing in controller" });
  });
}

// 5. Shipping Rates Route
router.post("/shipping/rates", async (req, res) => {
  try {
    const { pincode } = req.body;
    const result = await getCourierRates(pincode);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});




module.exports = router;