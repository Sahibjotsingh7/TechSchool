const express = require('express');
const router = express.Router();
const noteController = require('../Controllers/Notecontrol');


router.get('/notes', noteController.getAllNotes);

router.get('/notes/:language', noteController.getNotesByLanguage);

module.exports = router;
