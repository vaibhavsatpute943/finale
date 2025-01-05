const mongoose = require('mongoose');

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  sender_upi_id: { type: String, required: true },
  receiver_upi_id: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create Transaction Model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
