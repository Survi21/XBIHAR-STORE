
const { getCourierRates } = require("../services/shiprocketRates");

exports.getShippingRates = async (req, res) => {
  try {
    const { pincode, weight } = req.body;

    // Default weight handle karne ke liye fallback 0.5 de diya
    const result = await getCourierRates(pincode, weight || 0.5);
    console.log("SHIPPING RESULT TO FRONTEND =", result);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ success: false, message: "No couriers available" });
    }

  } catch (err) {
    console.log("SHIPPING CONTROLLER ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};