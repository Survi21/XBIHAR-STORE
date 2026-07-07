
// // import dns from "node:dns/promises";
// // dns.setServers(["8.8.8.8", "1.1.1.1"]);


// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// const connectDB = require("./config/db");

// const productRoutes = require("./routes/productRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const authRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const shippingRoutes = require("./routes/shippingRoutes");
// const wishlistRoutes = require("./routes/wishlistRoutes");
// const subscribeRoute = require("./routes/subscribe");
// const newsletterRoute = require("./routes/sendNewsletter");
// const contactRoute = require("./routes/contact");
// const adminRoutes = require("./routes/admin");
// const paymentRoutes = require("./routes/paymentRoutes");
// const shiprocketWebhookRoutes = require("./routes/shiprocketWebhook");
// connectDB();

// const app = express();



// const dns = require("dns");
// // Change DNS
// dns.setServers(["1.1.1.1", "8.8.8.8"]);


// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
// }));

// app.use(express.json());
// app.use(cookieParser()); 

// app.get("/", (req, res) => {
//   res.send("XBIHAR 🚀");
// });

// // ✅ Routes
// app.use("/api/products", productRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/shipping", shippingRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/subscribe", subscribeRoute);
// app.use("/api/newsletter", newsletterRoute);
// app.use("/api/contact", contactRoute);
// app.use(adminRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use('/api/webhooks', shiprocketWebhookRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


// 1. Sabse pehle DNS change karna hoga taaki aage ki saari requests isi DNS se jayein
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// 2. Env config load karein
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// 3. Database connection module import karein
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const shippingRoutes = require("./routes/shippingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const subscribeRoute = require("./routes/subscribe");
const newsletterRoute = require("./routes/sendNewsletter");
const contactRoute = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const paymentRoutes = require("./routes/paymentRoutes");
const shiprocketWebhookRoutes = require("./routes/shiprocketWebhook");

// 4. DNS set hone ke BAAD ab DB connect call karein
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); 

app.get("/", (req, res) => {
  res.send("XBIHAR 🚀");
});

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/contact", contactRoute);
app.use(adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/webhooks', shiprocketWebhookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});