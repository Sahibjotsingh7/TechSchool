const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    language: { type: String, required: true },
    description: { type: String, required: true },
    downloadUrl: { type: String, required: true }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
