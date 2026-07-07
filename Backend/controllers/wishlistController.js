const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { productId, title, price, image, userEmail } = req.body;

    const exists = await Wishlist.findOne({
      productId,
      userEmail,
    });

    if (exists) {
      return res.json({
        success: false,
        message: "Already in wishlist",
      });
    }

    const item = await Wishlist.create({
      productId,
      title,
      price,
      image,
      userEmail,
    });

    res.json({
      success: true,
      item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find();

    res.json(items);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const removeWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};
