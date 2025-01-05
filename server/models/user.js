const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  upi_id: { type: String, unique: true },
  balance: { type: Number, default: 1000 }
});

// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
