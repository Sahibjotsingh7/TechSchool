
const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/videoController');


router.get('/videos', videoController.getAllVideos);

module.exports = router;
