const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Handle feedback submission
exports.submitFeedback = async (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email options
  const mailOptions = {
    from: email, // User's email
    to: process.env.EMAIL_USER, // Your email to receive feedback
    subject: `Feedback from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};
