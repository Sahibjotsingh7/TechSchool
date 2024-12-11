const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // Users who liked the video
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to the user who made the review
      username: { type: String, required: true }, // Store the username
      reviewText: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5 },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
