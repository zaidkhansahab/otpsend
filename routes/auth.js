const express = require('express');
const router = express.Router();
const { requestOTP, verifyOTP } = require('../controllers/authController');

// Routes
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;
