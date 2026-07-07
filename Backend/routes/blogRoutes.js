const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createBlog,
} = require("../controllers/blogController");

router.get("/", getBlogs);
router.post("/", createBlog);

module.exports = router;