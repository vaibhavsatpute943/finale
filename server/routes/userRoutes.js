const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

// Function to generate a unique UPI ID
const generateUPI = () => {
  const randomId = crypto.randomBytes(4).toString('hex'); // Generates a random 8-character ID
  return `${randomId}@fastpay`;
};

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Generate UPI ID
    const upi_id = generateUPI();
    const balance = 1000;

    // Create new user
    user = new User({ name, email, password, upi_id, balance });
    await user.save();

    res.status(201).send({ message: 'User registered successfully!', upi_id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Get User Details Route
router.get('/user/:upi_id', async (req, res) => {
  try {
    const { upi_id } = req.params;

    const user = await User.findOne({ upi_id });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
