const express = require('express');
const cors = require('cors'); // CORS for all origins
const app = express();
const db = require('./db');
const User = require('./user'); // Mongoose model

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Root route for Render testing
app.get('/', (req, res) => {
  res.send("API is running successfully");
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ id: 1 }); // ascending order
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET user by MongoDB _id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST: Add new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User({
      id: req.body.id,
      user: req.body.user,
      age: req.body.age
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).send(err.message);
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
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE: Remove user by MongoDB _id
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.json({
      message: 'User deleted successfully',
      deletedUser
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Render deployment port fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});