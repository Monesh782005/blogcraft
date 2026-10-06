const express = require("express");

const {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all blogs
router.get("/", getAllBlogs);

// Create Blog
router.post("/", authMiddleware, createBlog);

// Update Blog
router.put("/:id", authMiddleware, updateBlog);

// Delete Blog
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;