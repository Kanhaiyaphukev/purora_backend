const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const User = require('./user');

// Middleware
app.use(cors());
app.use(express.json());


// Root Route
app.get('/', (req, res) => {
  res.send("API is running successfully");
});


// GET - All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ id: 1 });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      count: users.length,
      data: users
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// GET - Single User by MongoDB _id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// POST - Add New User
app.post('/addUser', async (req, res) => {
  try {
    const { id, user, mobile, age, avatar } = req.body;

    // Validation
    if (!id || !user || !mobile || !age || !avatar) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Duplicate check using custom id
    const existingUser = await User.findOne({ id });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this ID already exists'
      });
    }

    const newUser = new User({
      id,
      user,
      mobile,
      age,
      avatar
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User added successfully',
      data: savedUser
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// PUT - Update User
app.put('/updateUser/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// DELETE - Remove User
app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});