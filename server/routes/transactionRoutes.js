const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Transaction Route
router.post('/transaction', async (req, res) => {
  try {
    const { sender_upi_id, receiver_upi_id, amount } = req.body;

    // Validate users
    const sender = await User.findOne({ upi_id: sender_upi_id });
    const receiver = await User.findOne({ upi_id: receiver_upi_id });

    if (!sender || !receiver) {
      return res.status(404).send({ message: 'Sender or receiver not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).send({ message: 'Insufficient balance' });
    }

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // Record transaction
    const transaction = new Transaction({ sender_upi_id, receiver_upi_id, amount });
    await transaction.save();

    res.status(201).send({ message: 'Transaction successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Get Transaction History Route
router.get('/transactions/:upi_id', async (req, res) => {
  try {
    const { upi_id } = req.params;

    const transactions = await Transaction.find({
      $or: [
        { sender_upi_id: upi_id },
        { receiver_upi_id: upi_id }
      ]
    }).sort({ timestamp: -1 });

    res.status(200).send(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
