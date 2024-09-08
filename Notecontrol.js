const Note = require('../Models/notes');

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNotesByLanguage = async (req, res) => {
    try {
        const { language } = req.params;
        const notes = await Note.find({ language });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
