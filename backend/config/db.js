const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully ✅");
    } catch (error) {
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
    }
};

module.exports = connectDB;