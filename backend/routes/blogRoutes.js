const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogByID);

module.exports = router;