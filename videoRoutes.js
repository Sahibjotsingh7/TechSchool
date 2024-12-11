const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/videoController');

// GET: Fetch all videos with reviews and likes populated
router.get('/all', videoController.getAllVideos);

// POST: Add a new review to a video
router.post('/:videoId/addreview', videoController.addReview);

// PUT: Update an existing review for a video
router.put('/:videoId/updatereview', videoController.updateReview);

// DELETE: Delete a review for a video
router.delete('/:videoId/review', videoController.deleteReview);

// POST: Toggle like for a video
router.post('/:videoId/like', videoController.toggleLike);

module.exports = router;
