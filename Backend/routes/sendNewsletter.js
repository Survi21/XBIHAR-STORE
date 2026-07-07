const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");

router.post("/", async (req, res) => {
  const { subject, message } = req.body;

  try {
    const subscribers = await Subscriber.find();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (let user of subscribers) {
      await transporter.sendMail({
        to: user.email,
        subject: subject,
        text: message,
      });
    }

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;

