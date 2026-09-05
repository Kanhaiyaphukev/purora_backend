const User = require('../models/user.model');


// PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: err.message
    });
  }
};


// DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Dashboard data fetched successfully',
      data: {
        user,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard',
      error: err.message
    });
  }
};

// AVATAR UPLOAD
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    //Cloudinary URL
    const avatarUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: err.message
    });
  }
};

exports.getProductList = async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    // Check third-party API response
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: "Failed to fetch products from third-party API"
      });
    }
    const resData = await response.json();
    return res.status(200).json({
      success: true,
      message: "Products List Fetched Successfully",
      data: resData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};