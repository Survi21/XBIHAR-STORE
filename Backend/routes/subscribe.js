
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");


// module.exports = router;
router.post("/", async (req, res) => {
  const { email } = req.body;

  console.log("✅ EMAIL RECEIVED:", email);

  try {
    if (!email) {
      return res.json({ success: false });
    }

    // ✅ CHECK DUPLICATE
    const exists = await Subscriber.findOne({ email });

    if (exists) {
      console.log("⚠️ Already exists");
      return res.json({ success: true, message: "Already subscribed" });
    }

    // ✅ SAVE TO DB
    const saved = await Subscriber.create({ email });

    console.log("✅ SAVED TO DB:", saved);

    // ✅ MAIL SETUP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ MAIL TO YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Subscriber",
      text: `New user subscribed: ${email}`,
    });

    // ✅ WELCOME MAIL
    await transporter.sendMail({
      to: email,
      subject: "Welcome to XBIHAR 🎉",
      text: "Thanks for subscribing!",
    });

    res.json({ success: true });

  } catch (error) {
    console.log("❌ FULL ERROR:", error); // 👈 THIS SHOWS REAL ISSUE
    res.json({ success: false });
  }
});


module.exports = router;
