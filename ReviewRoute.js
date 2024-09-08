const express = require('express');
const { addReview, getAllReviews } = require('../Controllers/ReviewControl');

const router = express.Router();

router.post('/add', addReview);
router.get('/all', getAllReviews); 

module.exports = router;