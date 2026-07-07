const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

router.post("/add", addToWishlist);

router.get("/", getWishlist);

router.delete("/:id", removeWishlist);

module.exports = router;