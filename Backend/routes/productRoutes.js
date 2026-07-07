
const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ ALL PRODUCTS
router.get("/", getProducts);

// ✅ SINGLE PRODUCT
router.get("/:id", getProductById);

// ✅ ADD
router.post("/add", createProduct);

// ✅ UPDATE
router.put("/:id", updateProduct);

// ✅ DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
