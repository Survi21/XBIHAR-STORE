

const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    productId: Number,
    title: String,
    price: Number,
    image: String,
    userEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);