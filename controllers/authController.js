const User = require('../models/User');

const crypto = require('crypto');
const { generateOTP } = require('../utilities/utility');
const { sendOTPEmail } = require('../utilities/sendOtp');






// Request OTP
exports.requestOTP = async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email });
        }
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
 
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        if(otp != user.otp) {
            return res.status(400).json({message: 'otp does not match ' })
        }
        

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'OTP verified, login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
