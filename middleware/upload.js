const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // your config file

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // same 5MB limit
    fileFilter
});

module.exports = upload;