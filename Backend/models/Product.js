
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },

    tagline: String,
    description: String,
    features: [String],
    inspiration: String,

    images: [String],

    // ✅ NEW: size-wise stock (future ready)
    sizes: [
      {
        size: String,
        stock: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);