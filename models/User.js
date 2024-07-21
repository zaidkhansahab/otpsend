const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
