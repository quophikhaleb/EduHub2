
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const paymentsFile = path.join(__dirname, '../data/payments.json');

function readPayments() {
  try {
    const data = fs.readFileSync(paymentsFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writePayments(payments) {
  fs.writeFileSync(paymentsFile, JSON.stringify(payments, null, 2));
}

// @route   POST /api/pay
// @desc    Record a new payment
// @access  Public
router.post('/', (req, res) => {
  const { courseId, userId, amount } = req.body;

  if (!courseId || !userId || !amount) {
    return res.status(400).json({ message: 'Missing required payment fields.' });
  }

  const payments = readPayments();
  payments.push({ courseId, userId, amount });
  writePayments(payments);

  res.json({ success: true, message: 'Payment processed successfully.' });
});

// @route   POST /api/pay/check-access
// @desc    Check if user has access to a course
// @access  Public
router.post('/check-access', (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'Missing userId or courseId' });
  }

  const payments = readPayments();
  const hasAccess = payments.some(p => p.userId == userId && p.courseId == courseId);

  if (hasAccess) {
    return res.status(200).json({ access: true });
  } else {
    return res.status(403).json({ access: false, message: 'No access. Please make payment.' });
  }
});

module.exports = router;



