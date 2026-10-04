const Blog = require("../models/Blog");

// ── Image path constants ──────────────────────────────────────────────────────
const BROKEN_IMAGES = new Set([
    "assets/images/article-js.jpg",
    ""
]);

/**
 * Returns the correct image path for a blog based on its title.
 * Used to auto-fix any stored broken image paths.
 */
function resolveImage(title, storedImage) {
    // If stored image is valid, keep it
    if (storedImage && !BROKEN_IMAGES.has(storedImage)) {
        return storedImage;
    }

    const name = String(title || "").toLowerCase().trim();

    if (
        name === "getting started with javascript" ||
        (name.includes("getting started") &&
            name.includes("javascript") &&
            !name.includes("modern javascript"))
    ) {
        return "assets/images/article-javascript-backend.jpg";
    }

    if (
        name.includes("first blog from backend") ||
        name.includes("my first blog")
    ) {
        return "assets/images/article-backend-api.jpg";
    }

    if (
        name.includes("full stack") &&
        name.includes("developer") &&
        !name.includes("architecture")
    ) {
        return "assets/images/article-fullstack-dev.jpg";
    }

    if (
        name.includes("full stack architecture") ||
        name.includes("full-stack architecture") ||
        name.includes("bridging frontend")
    ) {
        return "assets/images/article-fullstack-2026.jpg";
    }

    if (name.includes("cybersecurity")) {
        return "assets/images/article-cybersecurity.jpg";
    }

    if (name.includes("artificial intelligence")) {
        return "assets/images/article-ai.jpg";
    }

    if (name.includes("web development roadmap")) {
        return "assets/images/article-webdev.jpg";
    }

    if (name.includes("cloud architecture")) {
        return "assets/images/article-cloud.jpg";
    }

    if (name.includes("design system")) {
        return "assets/images/article-design-system.svg";
    }

    // Safe fallback
    return "assets/images/article-javascript-backend.jpg";
}


// Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, content, category, image } = req.body;

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        // Sanitize the image path — never store broken paths
        const safeImage = resolveImage(title, image);

        // Create blog
        const blog = await Blog.create({
            title,
            content,
            category,
            image: safeImage,
            author: req.user.id
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.error("Create blog error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        // Sanitize image paths on the fly for any stale documents
        const sanitizedBlogs = blogs.map(blog => {
            const safeImage = resolveImage(blog.title, blog.image);
            if (safeImage !== blog.image) {
                // Patch the plain object (do not save to DB here — use the migration script)
                const obj = blog.toObject();
                obj.image = safeImage;
                return obj;
            }
            return blog;
        });

        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: sanitizedBlogs
        });

    } catch (error) {
        console.error("Get blogs error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createBlog,
    getAllBlogs
};