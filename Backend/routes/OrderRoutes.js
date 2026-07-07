const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");
const admin =
require("../middleware/adminMiddleware");


const {
  getCourierRates,
} = require("../services/shiprocketRates");

const {
  createGuestOrder,
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
updateOrderStatus
} = require("../controllers/orderController");


router.post("/", protect, createOrder);

// router.get("/admin", getAllOrders);
router.get("/admin", protect, admin, getAllOrders);

router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

router.post("/", protect, createOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);



router.post("/shipping/rates", async (req, res) => {
  const { pincode } = req.body;

  const result = await getCourierRates(pincode);

  res.json(result);
});


module.exports = router;
