const express = require("express");

const {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all blogs — Public
router.get("/", getAllBlogs);

// Get logged-in user's blogs — Protected
router.get("/my", authMiddleware, getMyBlogs);

// Create Blog — Protected
router.post("/", authMiddleware, createBlog);

// Update Blog — Protected
router.put("/:id", authMiddleware, updateBlog);

// Delete Blog — Protected
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;