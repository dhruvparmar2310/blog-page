const Blog = require("../models/Blog");
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ dCreatedDate: -1 });
    return res.status(200).json({ success: true, data: blogs, message: 'Blogs List Success' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBlogByID = async (req, res) => {
    console.log('Fetching blog with title slug:', req.params);
  try {
    const blog = await Blog.findById(req.params.id);
    console.log('Blog By Title fetched:', blog);
    return res.status(200).json({ success: true, data: blog, message: 'Blogs List Success' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};