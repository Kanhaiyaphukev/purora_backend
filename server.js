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


/// GET - All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ srno: 1 });

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


// GET - Single User by srno
app.get('/users/:srno', async (req, res) => {
  try {
    const user = await User.findOne({ srno: req.params.srno });

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
    const { user, mobile, age, avatar } = req.body;


    let missingFields = [];

    if (!user) missingFields.push("User Name");
    if (!mobile) missingFields.push("Mobile Number");
    if (!age) missingFields.push("Age");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(", ")}`
      });
    }

    const lastUser = await User.findOne().sort({ srno: -1 });

    const newSrno = lastUser ? lastUser.srno + 1 : 1;

    const newUser = new User({
      srno: newSrno,
      user,
      mobile,
      age,
      avatar: avatar || ""
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: savedUser
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// PUT - Update User by srno
app.put('/updateUser/:srno', async (req, res) => {
  try {
    const { user, mobile, age, avatar } = req.body;

    // Check missing required fields
    let missingFields = [];

    if (!user) missingFields.push("User Name");
    if (!mobile) missingFields.push("Mobile Number");
    if (!age) missingFields.push("Age");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(", ")}`
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { srno: req.params.srno },
      {
        user,
        mobile,
        age,
        avatar: avatar || ""
      },
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

// DELETE - Remove User by srno
app.delete('/deleteUser/:srno', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      srno: req.params.srno
    });

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