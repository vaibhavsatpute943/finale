 
import React, { useState } from 'react';
import axios from 'axios';

function Transaction() {
  const [senderUPI, setSenderUPI] = useState('');
  const [receiverUPI, setReceiverUPI] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransaction = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!senderUPI || !receiverUPI || !amount) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      // Send the transaction request to the backend API
      const response = await axios.post('http://localhost:5000/api/transaction', {
        sender_upi_id: senderUPI,
        receiver_upi_id: receiverUPI,
        amount: parseFloat(amount)
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // If the backend sends an error message
        setMessage(error.response.data.message);
      } else {
        setMessage('Server error');
      }
    }
  };

  return (
    <div>
      <h2>Make a Transaction</h2>
      <form onSubmit={handleTransaction}>
        <input
          type="text"
          placeholder="Sender UPI ID"
          value={senderUPI}
          onChange={(e) => setSenderUPI(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver UPI ID"
          value={receiverUPI}
          onChange={(e) => setReceiverUPI(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Send Money</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Transaction;
