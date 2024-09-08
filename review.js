const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: { 
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true
    },

    
    rating: {
        type: Number,
        required: true
    }
});

const ReviewModel = mongoose.model('reviews',ReviewSchema);
module.exports = ReviewModel;

