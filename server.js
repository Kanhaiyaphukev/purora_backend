require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send("Purora API is running");
});
// Global error handler (optional)
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
});

// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});