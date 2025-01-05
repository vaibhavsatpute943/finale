import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import './transaction.css';  // Importing custom CSS

export default function Transaction() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [receiverUpi, setReceiverUpi] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          fetchTransactions(storedUser.upi_id);
          fetchBalance(storedUser.upi_id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserAndTransactions();
  }, []);

  const fetchTransactions = async (upi_id) => {
    try {
      const response = await axios.get(`http://localhost:5173/api/transactions/${upi_id}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchBalance = async (upi_id) => {
    try {
      const response = await axios.get(`http://localhost:5173/api/user/${upi_id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleTransaction = async () => {
    if (!amount || !receiverUpi) {
      setMessage("Please provide amount and receiver UPI ID.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5173/api/transaction", {
        sender_upi_id: user.upi_id,
        receiver_upi_id: receiverUpi,
        amount: parseFloat(amount),
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        fetchTransactions(user.upi_id);
        fetchBalance(user.upi_id);
        setAmount("");
        setReceiverUpi("");
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      setMessage("Transaction failed.");
    }
  };

  const chartData = transactions
    .map((tx) => ({
      timestamp: new Date(tx.timestamp).toLocaleDateString(),
      amount: tx.amount,
    }))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="transaction-container">
      <div className="user-info">
        {user && (
          <div className="card">
            <h5 className="card-title">User Information</h5>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UPI ID:</strong> {user.upi_id}</p>
            <p><strong>Balance:</strong> ₹{user.balance}</p>
          </div>
        )}
      </div>

      <div className="transaction-form">
        <h1>Initiate Transaction</h1>
        <input
          type="text"
          placeholder="Receiver UPI ID"
          value={receiverUpi}
          onChange={(e) => setReceiverUpi(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn-send" onClick={handleTransaction}>Send Money</button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="transaction-history">
        <h1>Transaction History</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.sender_upi_id}</td>
                <td>{transaction.receiver_upi_id}</td>
                <td>₹{transaction.amount}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transaction-graph">
        <h1>Transaction Graph</h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
