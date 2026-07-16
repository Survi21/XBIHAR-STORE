

const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    productId: String,
    title: String,
    price: Number,
    image: String,
    userEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);