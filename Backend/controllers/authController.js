
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ✅ Generate token
const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET);
};

// ✅ Transporter utility function
const getTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ✅ REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });

    console.log("✅ OTP:", otp);

    const transporter = getTransporter();
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
      });
      console.log("✅ EMAIL SENT");
    } catch (err) {
      console.log("❌ EMAIL ERROR:", err);
    }

    res.json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    console.log("❌ REGISTER ERROR:", err);
    res.status(500).json({ success: false });
  }
};

// ✅ LOGIN (Modified: Handles explicit wrong password text)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User account does not exist. Please register." });
    }

    // Explicit check for wrong password
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password! Please try again or reset it." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; 
    user.isVerified = false; 
    await user.save();

    console.log(`✅ Login OTP Generated for ${email}:`, otp);

    const transporter = getTransporter();
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Login OTP Code",
        text: `Your login OTP is: ${otp}. It is valid for 5 minutes.`,
      });
      console.log("✅ LOGIN EMAIL SENT");
    } catch (mailErr) {
      console.log("❌ LOGIN EMAIL ERROR:", mailErr);
      return res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }

    res.json({
      success: true,
      message: "OTP sent to email. Please verify.",
      requiresVerification: true
    });
  } catch (err) {
    console.log("❌ LOGIN ERROR", err);
    res.status(500).json({ success: false });
  }
};

// ✅ FORGOT PASSWORD (Generates dynamic OTP for Reset)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found with this email address." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes valid
    await user.save();

    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting password is: ${otp}. Valid for 10 minutes.`,
    });

    res.json({ success: true, message: "Password reset OTP sent to your email." });
  } catch (err) {
    console.log("❌ FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ RESET PASSWORD (Verifies OTP and Updates Password)
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, message: "Password updated successfully! You can login now." });
  } catch (err) {
    console.log("❌ RESET PASSWORD ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ GOOGLE LOGIN
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "No Google token" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, isVerified: true });
    }

    const jwtToken = generateToken(user._id);
    res.cookie("token", jwtToken, { httpOnly: true, sameSite: "strict" });
    res.json({ success: true, user });
  } catch (err) {
    console.log("❌ GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};

// ✅ PROFILE
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ✅ LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};

// ✅ CHECK AUTH
exports.checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// ✅ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.otp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (user.otpExpiry < Date.now()) return res.json({ success: false, message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
};