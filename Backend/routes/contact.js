
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("✅ CONTACT RECEIVED:", name, email);

  try {
    // ✅ 1. SAVE IN DB
    const saved = await Contact.create({ name, email, message });
    console.log("✅ SAVED TO DB:", saved);

    // ✅ 2. EMAIL SETUP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ 3. SEND MAIL TO YOU
    await transporter.sendMail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      `,
    });

    res.json({ success: true });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.json({ success: false });
  }
});

module.exports = router;
