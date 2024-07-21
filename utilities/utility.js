const crypto = require('crypto');


// Generate OTP
exports.generateOTP = () => {
    return crypto.randomBytes(3).toString('hex'); // Generate a random 6-digit OTP
};