const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/payment/generate-qr - Generate UPI QR details
router.post('/payment/generate-qr', (req, res) => {
  const { amount } = req.body;
  const upiId = "shreepratham@expressbank";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Shree%20Pratham%20Multi-Market&am=${parseFloat(amount).toFixed(2)}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;

  res.json({
    success: true,
    upiId,
    amount: parseFloat(amount).toFixed(2),
    qrCodeUrl,
    expiresInSeconds: 300
  });
});

// POST /api/payment/process - Process payment simulation
router.post('/payment/process', (req, res) => {
  const { method, amount, customerInfo } = req.body;

  if (!method || !amount) {
    return res.status(400).json({ error: 'Payment method and amount required' });
  }

  // Simulate network processing delay
  setTimeout(() => {
    const transactionId = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    res.json({
      success: true,
      status: 'APPROVED',
      transactionId,
      paymentMethod: method,
      amountPaid: amount,
      timestamp: new Date().toISOString()
    });
  }, 1000);
});

// POST /api/payment/verify-otp - Verify Card 3D-Secure OTP
router.post('/payment/verify-otp', (req, res) => {
  const { otp } = req.body;

  if (otp === "123456" || (otp && otp.length === 6)) {
    res.json({ success: true, verified: true, message: '3D-Secure OTP Authenticated' });
  } else {
    res.status(400).json({ success: false, verified: false, error: 'Invalid OTP code. Try test code: 123456' });
  }
});

// POST /api/coupons/validate - Check coupon code
router.post('/coupons/validate', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code required' });

  db.get('SELECT * FROM coupons WHERE UPPER(code) = UPPER(?)', [code], (err, coupon) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!coupon) return res.status(404).json({ success: false, error: 'Invalid promo code' });

    res.json({ success: true, coupon });
  });
});

module.exports = router;
