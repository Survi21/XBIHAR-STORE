




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
  updateOrderStatus,
} = require("../controllers/orderController");

// 1. Create Normal Order
router.post("/", protect, createOrder);

// 2. Cashfree Payment Verify & Auto Order Creation (⭐️ Main Fix)
router.post("/verify", protect, verifyAndCreateOrder);
router.post("/verify-and-create", protect, verifyAndCreateOrder); // Backup alias

// 3. User Orders & Specific Order Fetching
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// 4. Admin Routes
router.get("/admin", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

// 5. Shipping Rates Route
router.post("/shipping/rates", async (req, res) => {
  const { pincode } = req.body;
  const result = await getCourierRates(pincode);
  res.json(result);
});

module.exports = router;