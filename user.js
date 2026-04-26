const mongoose = require('mongoose');

// Define the schema for your user documents
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Export the model to use in other files
module.exports = mongoose.model('User', userSchema);
