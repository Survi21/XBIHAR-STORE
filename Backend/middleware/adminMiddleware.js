// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const admin = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: "No token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ message: "Admin only" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// module.exports = admin;





const jwt = require("jsonwebtoken");
const User = require("../models/User");

const admin = async (req, res, next) => {
  try {
    // 🌟 NAYA STEP: Cookie ya Header dono se token nikalne ka flexible tarika
    let token = req.cookies ? req.cookies.token : null;

    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Bearer hatayega
      } else {
        token = req.headers.authorization; // Agar bina Bearer ke aaya ho
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 🌟 IMPORTANT CHECK: decoded.id ya decoded._id dono ko safe tarike se handle karne ke liye
    const userId = decoded.id || decoded._id;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = admin;