const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: 'NovaCryptoPay API is running!',
    timestamp: new Date().toISOString()
  });
});

// Routes Example
app.post('/api/payment/session', (req, res) => {
  const { chain, amount, currency } = req.body;

  if (!chain || !amount || !currency) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: chain, amount, currency'
    });
  }

  // Simulate ephemeral wallet (just a fake address for now)
  const fakeAddress = `${chain}_WALLET_${Math.random().toString(36).substring(2, 10)}`;

  res.json({
    status: 'success',
    session: {
      chain,
      amount,
      currency,
      walletAddress: fakeAddress,
      expiresIn: '4h'
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
