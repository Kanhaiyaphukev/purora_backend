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

// UPLOAD AVATAR
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

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