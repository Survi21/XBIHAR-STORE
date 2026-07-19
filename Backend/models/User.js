
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

 
role: {
  type: String,
  enum: ["user", "admin"],  // ✅ better control
  default: "user",
},


  // ✅ ADD THESE 👇
  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);
