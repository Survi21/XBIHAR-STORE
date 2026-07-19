
// // const express = require("express");
// // const router = express.Router();
// // const mongoose = require("mongoose");
// // const Order = require("../models/Order");

// // // --- 💡 1. SCHEMAS DEFINITION ---
// // const ProductSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   price: Number,
// //   originalPrice: Number,
// //   image: String, // Image URL string
// //   stock: {
// //     S: { type: Number, default: 0 },
// //     M: { type: Number, default: 0 },
// //     L: { type: Number, default: 0 },
// //     XL: { type: Number, default: 0 }
// //   }
// // }, { timestamps: true });

// // const CouponSchema = new mongoose.Schema({
// //   code: { type: String, unique: true, uppercase: true },
// //   discountType: { type: String, default: "FLAT" }, // FLAT ya PERCENTAGE
// //   discountValue: Number,
// //   minOrderValue: { type: Number, default: 0 },
// //   active: { type: Boolean, default: true }
// // });

// // const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
// // const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);


// // // --- 🚀 LIVE ORDERS GET ROUTE ---
// // router.get("/api/admin/orders", async (req, res) => {
// //   try {
// //     const orders = await Order.find().sort({ createdAt: -1 });

// //     let totalSales = 0;
// //     orders.forEach(order => {
// //       if (order.status !== "Cancelled") {
// //         totalSales += (order.totalPrice || 0);
// //       }
// //     });

// //     const analytics = {
// //       totalOrders: orders.length,
// //       totalSales: totalSales,
// //       pendingOrders: orders.filter(o => o.status === "Pending").length
// //     };

// //     return res.json({
// //       success: true,
// //       orders: orders || [],
// //       analytics: analytics
// //     });
// //   } catch (err) {
// //     return res.status(500).json({ 
// //       success: false, 
// //       message: "Orders load nahi ho paye", 
// //       error: err.message,
// //       orders: [],
// //       analytics: { totalOrders: 0, totalSales: 0, pendingOrders: 0 }
// //     });
// //   }
// // });


// // // --- 💡 2. PRODUCT MANAGEMENT ROUTES ---
// // router.post("/api/admin/products", async (req, res) => {
// //   try {
// //     const newProduct = new Product(req.body);
// //     await newProduct.save();
// //     return res.json({ success: true, message: "Product Add Ho Gaya!", product: newProduct });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });

// // router.get("/api/admin/products", async (req, res) => {
// //   try {
// //     const products = await Product.find().sort({ createdAt: 1 });
// //     return res.json({ success: true, products: products || [] });
// //   } catch (err) {
// //     return res.json({ success: true, products: [] });
// //   }
// // });


// // // --- 💡 3. COUPON MANAGEMENT ROUTES ---
// // router.post("/api/admin/coupons", async (req, res) => {
// //   try {
// //     const newCoupon = new Coupon(req.body);
// //     await newCoupon.save();
// //     return res.json({ success: true, message: "Coupon Created Successfully!", coupon: newCoupon });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });

// // router.get("/api/admin/coupons", async (req, res) => {
// //   try {
// //     const coupons = await Coupon.find();
// //     return res.json({ success: true, coupons: coupons || [] });
// //   } catch (err) {
// //     return res.json({ success: true, coupons: [] });
// //   }
// // });

// // // 🎯 🌟 NAYA & CRITICAL: COUPON DELETE ROUTE (Yeh abhi tak missing tha) 🌟
// // router.delete("/api/admin/coupons/:id", async (req, res) => {
// //   try {
// //     const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
// //     if (!deletedCoupon) {
// //       return res.status(404).json({ success: false, message: "Coupon nahi mila!" });
// //     }
// //     return res.json({ success: true, message: "Coupon successfully delete ho gaya!" });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });


// // // --- 💡 4. SHIPROCKET DISPATCH ROUTE ---
// // router.post("/api/admin/orders/:id/dispatch", async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);
// //     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

// //     console.log(`Shiprocket API Triggered for Pincode: ${order.shippingAddress?.pincode}`);
    
// //     const mockAWB = "SR" + Math.floor(1000000000 + Math.random() * 9000000000);
    
// //     order.status = "Shipped";
// //     order.trackingId = mockAWB;
// //     await order.save();

// //     return res.json({ 
// //       success: true, 
// //       message: "Order Dispatched via Shiprocket successfully!", 
// //       awb: mockAWB 
// //     });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });

// // // --- 💡 5. STATUS UPDATE ROUTE ---
// // router.put("/api/admin/orders/:id/status", async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);
// //     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

// //     order.status = req.body.status;
// //     await order.save();
// //     return res.json({ success: true, message: "Status updated!" });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });


// // router.delete("/api/admin/orders/:id", protect, admin, async (req, res) => {
// //   try {
// //     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
// //     if (!deletedOrder) {
// //       return res.status(404).json({ success: false, message: "Order not found" });
// //     }
// //     return res.json({ success: true, message: "Order deleted successfully!" });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });


// // module.exports = router;




const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// --- 💡 1. SCHEMAS DEFINITION ---
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  originalPrice: Number,
  image: String,
  stock: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 }
  }
}, { timestamps: true });

const CouponSchema = new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true },
  discountType: { type: String, default: "FLAT" },
  discountValue: Number,
  minOrderValue: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);


// --- 🚀 LIVE ORDERS GET ROUTE ---
router.get("/api/admin/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    let totalSales = 0;
    orders.forEach(order => {
      if (order.status !== "Cancelled") {
        totalSales += (order.totalPrice || 0);
      }
    });

    const analytics = {
      totalOrders: orders.length,
      totalSales: totalSales,
      pendingOrders: orders.filter(o => o.status === "Pending").length
    };

    return res.json({
      success: true,
      orders: orders || [],
      analytics: analytics
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Orders load nahi ho paye",
      error: err.message,
      orders: [],
      analytics: { totalOrders: 0, totalSales: 0, pendingOrders: 0 }
    });
  }
});

// --- 🗑️ NEW: DELETE ORDER ROUTE ---
router.delete("/api/admin/orders/:id", protect, admin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.json({ success: true, message: "Order deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


// --- 💡 2. PRODUCT MANAGEMENT ROUTES ---
router.post("/api/admin/products", protect, admin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.json({ success: true, message: "Product Add Ho Gaya!", product: newProduct });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/api/admin/products", protect, admin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    return res.json({ success: true, products: products || [] });
  } catch (err) {
    return res.json({ success: true, products: [] });
  }
});


// --- 💡 3. COUPON MANAGEMENT ROUTES ---
router.post("/api/admin/coupons", protect, admin, async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    return res.json({ success: true, message: "Coupon Created Successfully!", coupon: newCoupon });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/api/admin/coupons", protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find();
    return res.json({ success: true, coupons: coupons || [] });
  } catch (err) {
    return res.json({ success: true, coupons: [] });
  }
});

router.delete("/api/admin/coupons/:id", protect, admin, async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ success: false, message: "Coupon nahi mila!" });
    }
    return res.json({ success: true, message: "Coupon successfully delete ho gaya!" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


// --- 💡 4. SHIPROCKET DISPATCH ROUTE ---
router.post("/api/admin/orders/:id/dispatch", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    console.log(`Shiprocket API Triggered for Pincode: ${order.shippingAddress?.pincode}`);

    const mockAWB = "SR" + Math.floor(1000000000 + Math.random() * 9000000000);

    order.status = "Shipped";
    order.trackingId = mockAWB;
    await order.save();

    return res.json({
      success: true,
      message: "Order Dispatched via Shiprocket successfully!",
      awb: mockAWB
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// --- 💡 5. STATUS UPDATE ROUTE ---
router.put("/api/admin/orders/:id/status", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = req.body.status;
    await order.save();
    return res.json({ success: true, message: "Status updated!" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;


