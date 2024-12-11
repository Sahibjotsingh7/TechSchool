const express = require('express');
const { submitFeedback } = require('../Controllers/feedbackController');

const router = express.Router();

// POST route for submitting feedback
router.post('/submit', submitFeedback);

module.exports = router;
