const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, mobile, password, role } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, mobile and password are required'
      });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role
    let userRole = 'customer';

    // Allow admin only in development
    if (process.env.NODE_ENV === 'development' && role === 'admin') {
      userRole = 'admin';
    }

    const newUser = new User({
      name,
      mobile,
      password: hashedPassword,
      role: userRole
    });

    const savedUser = await newUser.save();

    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userResponse
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: err.message
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and password are required'
      });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: userResponse
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: err.message
    });
  }
};