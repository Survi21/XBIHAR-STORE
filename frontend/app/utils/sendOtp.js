const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "XBIHAR Verification Code",
    html: `
      <h2>XBIHAR Account Verification</h2>
      <h3>Your OTP: ${otp}</h3>
      <p>Valid for 10 minutes.</p>
    `,
  });
};

module.exports = sendOTP;