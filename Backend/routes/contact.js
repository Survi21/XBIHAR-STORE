
// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");
// const Contact = require("../models/Contact");

// router.post("/", async (req, res) => {
//   const { name, email, message } = req.body;

//   console.log("✅ CONTACT RECEIVED:", name, email);

//   try {
//     // ✅ 1. SAVE IN DB
//     const saved = await Contact.create({ name, email, message });
//     console.log("✅ SAVED TO DB:", saved);

//     // ✅ 2. EMAIL SETUP
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // ✅ 3. SEND MAIL TO YOU
//     await transporter.sendMail({
//       to: process.env.EMAIL_USER,
//       subject: "New Contact Message",
//       text: `
//       Name: ${name}
//       Email: ${email}
//       Message: ${message}
//       `,
//     });

//     res.json({ success: true });

//   } catch (error) {
//     console.log("❌ ERROR:", error);
//     res.json({ success: false });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const Contact = require("../models/Contact");

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = "XBIHAR <otp@xbihar.com>";

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("✅ CONTACT RECEIVED:", name, email);

  try {
    // ✅ 1. SAVE IN DB
    const saved = await Contact.create({ name, email, message });
    console.log("✅ SAVED TO DB:", saved);

    // ✅ 2. SEND MAIL TO XBIHAR (Resend)
    await resend.emails.send({
      from: SENDER_EMAIL,
      to: "xbihar.in@gmail.com",
      subject: "New Contact Message",
      html: `
        <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; max-width: 600px; border: 1px solid #222;">
          <h2 style="color: #ff0000;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #111; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    console.log("✅ CONTACT EMAIL SENT");
    res.json({ success: true });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.json({ success: false });
  }
});

module.exports = router;