import { Resend } from 'resend';

// .env se key utha kar Resend initialize karein
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (toEmail, otp) => {
  try {
    await resend.emails.send({
      from: 'auth@xbihar.com', // Aapka professional domain email
      to: toEmail,
      subject: 'XBihar Store - OTP Verification',
      html: `<h3>Your Verification Code is: <b>${otp}</b></h3>`,
    });
    console.log("OTP sent successfully via Resend!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};