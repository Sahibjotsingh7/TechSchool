const express = require('express');
const router = express.Router();
const mcqController = require('../Controllers/mcqController');

// Route to get 10 random MCQs
router.get('/:collection', mcqController.getRandomMCQs);

// Route to check answers and get results
router.post('/checkanswers', mcqController.checkAnswers);

module.exports = router;
