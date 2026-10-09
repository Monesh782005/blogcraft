
const Blog = require("../models/Blog");

// Image paths that should be treated as broken.
const BROKEN_IMAGES = new Set([
    "assets/images/article-js.jpg",
    ""
]);

/**
 * Resolve the cover image for a blog.
 *
 * Priority:
 * 1. Preserve Base64 image data.
 * 2. Preserve external HTTP/HTTPS image URLs.
 * 3. Preserve existing non-empty local image paths.
 * 4. Use a title-based fallback only when the image is missing/broken.
 */
function resolveImage(title, storedImage) {
    if (typeof storedImage === "string") {
        const image = storedImage.trim();

        // Preserve uploaded Base64 image data.
        if (/^data:image\/[a-zA-Z0-9.+-]+;base64,/i.test(image)) {
            return image;
        }

        // Preserve external image URLs.
        if (/^https?:\/\/\S+$/i.test(image)) {
            return image;
        }

        // Preserve existing local paths unless known to be broken.
        if (image && !BROKEN_IMAGES.has(image)) {
            return image;
        }
    }

    const name = String(title || "").toLowerCase().trim();

    if (
        name === "getting started with javascript" ||
        (
            name.includes("getting started") &&
            name.includes("javascript") &&
            !name.includes("modern javascript")
        )
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
        name.includes("full stack architecture") ||
        name.includes("full-stack architecture") ||
        name.includes("bridging frontend")
    ) {
        return "assets/images/article-fullstack-2026.jpg";
    }

    if (name.includes("full stack") && name.includes("developer")) {
        return "assets/images/article-fullstack-dev.jpg";
    }

    if (name.includes("cybersecurity")) {
        return "assets/images/article-cybersecurity.jpg";
    }

    if (
        name.includes("artificial intelligence") ||
        name.includes("artificial intelligence") ||
        /\bai\b/.test(name)
    ) {
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

    // Default fallback for blogs without an image.
    return "assets/images/article-javascript-backend.jpg";
}

/**
 * Create Blog
 * POST /api/blogs
 */
const createBlog = async (req, res) => {
    try {
        const { title, content, category, image } = req.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const safeImage = resolveImage(title, image);

        const blog = await Blog.create({
            title: title.trim(),
            content,
            category,
            image: safeImage,
            author: req.user.id
        });

        const populatedBlog = await Blog.findById(blog._id)
            .populate("author", "name email");

        return res.status(201).json({
            message: "Blog created successfully",
            blog: populatedBlog
        });
    } catch (error) {
        console.error("Create blog error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

/**
 * Get All Blogs
 * GET /api/blogs
 */
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        const sanitizedBlogs = blogs.map((blog) => {
            const safeImage = resolveImage(blog.title, blog.image);

            if (safeImage !== blog.image) {
                const obj = blog.toObject();
                obj.image = safeImage;
                return obj;
            }

            return blog;
        });

        return res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: sanitizedBlogs
        });
    } catch (error) {
        console.error("Get blogs error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

/**
 * Get Logged-in User's Blogs
 * GET /api/blogs/my-blogs
 */
const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user.id
        })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        const sanitizedBlogs = blogs.map((blog) => {
            const safeImage = resolveImage(blog.title, blog.image);

            if (safeImage !== blog.image) {
                const obj = blog.toObject();
                obj.image = safeImage;
                return obj;
            }

            return blog;
        });

        return res.status(200).json({
            message: "User blogs fetched successfully",
            blogs: sanitizedBlogs
        });
    } catch (error) {
        console.error("Get my blogs error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

/**
 * Update Blog
 * PUT /api/blogs/:id
 */
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, image } = req.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this blog"
            });
        }

        // Keep the existing image when an edit doesn't include a new image.
        const imageToResolve =
            typeof image === "string" && image.trim()
                ? image
                : blog.image;

        const safeImage = resolveImage(title, imageToResolve);

        blog.title = title.trim();
        blog.content = content;
        blog.category = category;
        blog.image = safeImage;

        await blog.save();

        const populatedBlog = await Blog.findById(blog._id)
            .populate("author", "name email");

        return res.status(200).json({
            message: "Blog updated successfully",
            blog: populatedBlog
        });
    } catch (error) {
        console.error("Update blog error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

/**
 * Delete Blog
 * DELETE /api/blogs/:id
 */
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this blog"
            });
        }

        await Blog.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error("Delete blog error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    updateBlog,
    deleteBlog
};