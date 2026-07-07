
const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
};