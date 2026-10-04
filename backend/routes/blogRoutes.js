const express = require("express");

const {
    createBlog,
    getAllBlogs
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all blogs
router.get("/", getAllBlogs);

// Create Blog
router.post("/", authMiddleware, createBlog);

module.exports = router;