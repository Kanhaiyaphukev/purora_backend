const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Validate required env variables
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;