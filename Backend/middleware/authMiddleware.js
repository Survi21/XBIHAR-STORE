
// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // ✅ user id
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = protect;




const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // 🌟 NAYA STEP: Pehle cookie check karega, agar nahi mili toh Header (Bearer) check karega
  let token = req.cookies ? req.cookies.token : null;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN" me se sirf TOKEN nikalega
  }

  // Agar dono jagah token nahi mila
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ user id save ho jayegi
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;