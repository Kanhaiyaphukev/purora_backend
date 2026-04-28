const express = require('express');
const cors = require('cors'); // CORS for all origins
const app = express();
const db = require('./db');
const User = require('./user'); // Mongoose model

// Middleware
app.use(cors());
app.use(express.json());

// Root route for Render testing
app.get('/', (req, res) => {
  res.send("API is running successfully");
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ id: 1 });

    res.json({
      message: 'Users fetched successfully',
      data: users
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// GET user by MongoDB _id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User fetched successfully',
      data: user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// POST: Add new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User({
      id: req.body.id,
      user: req.body.user,
      mobile: req.body.mobile,
      age: req.body.age,
      avatar: req.body.avatar
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User added successfully',
      data: savedUser
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// PUT: Update user by MongoDB _id
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// DELETE: Remove user by MongoDB _id
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User deleted successfully',
      data: deletedUser
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Render deployment port fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});