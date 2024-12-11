const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/user");

const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey"; // Use environment variable for security

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists. Please login.', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "SignUp Successful",
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "SignUp Unsuccessful, internal server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = "Authentication Failed! Wrong email or password";

        if (!user) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1h" } // Token expiration time
        );

        res.status(200).json({
            message: "Login Successful",
            success: true,
            token, // Include the token in the response
            id:user._id,
            email: user.email,
            name: user.name,
        
        });
    } catch (err) {
        res.status(500).json({
            message: "Login Unsuccessful, internal server error",
            success: false,
        });
    }
};

const nodemailer = require('nodemailer');
const crypto = require('crypto'); // To generate OTPs
const otpMap = new Map(); // Temporary storage for OTPs (Replace with Redis or DB for production)

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:'techschoolweb@gmail.com',   // Use email from environment variable
        pass: 'eluu ppob nojg kdmj'   // Use app password from environment variable
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Generate OTP and send email
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
    const expiresAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    otpMap.set(email, { otp, expiresAt });

    // Send email
    const mailOptions = {
        from: 'techschoolweb@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It will expire in 15 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Error sending OTP' });
    }
};
const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    if (!otpMap.has(email)) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    const { otp: storedOtp, expiresAt } = otpMap.get(email);

    if (Date.now() > expiresAt) {
        otpMap.delete(email);
        return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    if (parseInt(otp, 10) !== storedOtp) {
        return res.status(400).json({ success: false, message: 'Incorrect OTP' });
    }

    otpMap.delete(email);
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
};

const emailReset = async (req, res) => {
    try {
        const { currentEmail, newEmail, password } = req.body;

        // Find the user by current email
        const user = await UserModel.findOne({ email:currentEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify the user's password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ success: false, message: 'Incorrect password' });
        }

        // Update the email
        user.email = newEmail;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update email, internal server error',
        });
    }
};
// In your Controllers/AuthControl.js

const deleteAccount = async (req, res) => {

      
    try {
        const { email } = req.body;

        // Find the user by email
         const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Delete the user from the database
        await user.deleteOne();

        res.status(200).json({ success: true, message: 'Account deleted successfully' });
    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete account, internal server error',
        });
    }
};




module.exports = {
    signup,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    emailReset,
    deleteAccount
};
