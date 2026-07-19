

// const express = require("express");

// const router = express.Router();

// const protect = require("../middleware/authMiddleware");

// const {
//   register,
//   login,
//   profile,
//   verifyOTP,
//   googleLogin,
//   logout,
//   checkAuth
// } = require("../controllers/authController");


// // ✅ AUTH ROUTES
// router.post("/register", register);
// router.post("/login", login);
// router.post("/google-login", googleLogin);
// router.post("/verify-otp", verifyOTP);

// // ✅ PROTECTED ROUTES
// router.get("/profile", protect, profile);
// router.get("/check", protect, checkAuth);

// // ✅ LOGOUT
// router.post("/logout", logout);

// module.exports = router;

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  register,
  login,
  profile,
  verifyOTP,
  googleLogin,
  logout,
  checkAuth,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

// ✅ AUTH ROUTES
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/verify-otp", verifyOTP);

// 🔑 FORGOT & RESET PASSWORD
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✅ PROTECTED ROUTES
router.get("/profile", protect, profile);
router.get("/me", protect, profile);
router.get("/check", protect, checkAuth);

// ✅ LOGOUT
router.post("/logout", logout);

module.exports = router;