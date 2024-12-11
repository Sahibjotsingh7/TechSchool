
const UserModel = require('../Models/user');
const Video = require('../Models/Video');
// Adjust path based on your file structure


exports.getAllVideos = async (req, res) => {
  try {
    // Fetch all videos, populate reviews (user names) and likes (user names)
    const videos = await Video.find({})
      .populate('reviews.user', 'name')  // Populate reviewer names in reviews
      .populate('likes', 'name')        // Populate user names in likes array
      .exec();

    res.json(videos); // Send videos with populated reviews and likes
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};




exports.toggleLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { email } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id; // ObjectId of the user

    // Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Ensure the 'likes' array is initialized as an empty array if not already
    if (!Array.isArray(video.likes)) {
      video.likes = [];
    }

    // Check if the user has already liked the video
    const hasLiked = video.likes.some((like) => like && like.equals(userId)); // Check for valid ObjectId

    if (hasLiked) {
      // Remove like
      video.likes = video.likes.filter((like) => like && !like.equals(userId)); // Filter out the user
      await video.save();
      return res.json({ message: 'like Removed', likes: video.likes });
    } else {
      // Add like
      video.likes.push(userId);
      await video.save();
      return res.json({ message: 'Liked', likes: video.likes });
    }
  } catch (err) {
    console.error('Error in toggleLike:', err.message);
    res.status(500).json({ error: 'Failed to toggle like', details: err.message });
  }
};



// Add or update review
// Add a new review (POST)
exports.addReview = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { reviewText, rating, email } = req.body;

    // Find user by email to get user ID
    const user = await UserModel.findOne({ email: email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id; // Get user ID from the found user
    const userName = user.name || 'Anonymous'; // Fallback to 'Anonymous' if user.name is missing

    // Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Ensure the reviews field is an array
    if (!Array.isArray(video.reviews)) {
      return res.status(500).json({ message: 'Invalid reviews field structure' });
    }

    // Check if user has already reviewed the video
    const existingReview = video.reviews.find((r) => r.user && r.user.toString() === userId.toString());
    console.log(existingReview);
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this video. Please update your review instead.' });
    }

    

    // Add new review
    video.reviews.push({
      user: userId,
      username: userName, // Ensure username is correctly set
      reviewText,
      rating,
      timestamp: Date.now(),
    });

    await video.save();
    res.json({ message: 'Review added successfully', reviews: video.reviews });
  } catch (err) {
    console.error('Error adding review:', err.message);
    res.status(500).json({ error: 'Failed to add review', details: err.message });
  }
};


// Update an existing review (PUT)
exports.updateReview = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { reviewText, rating, email } = req.body;

    // Find user by email to get user ID
    const user = await UserModel.findOne({ email: email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id; // Get user ID from the found user
    const userName = user.name || 'Anonymous'; // Fallback to 'Anonymous' if user.name is missing

    // Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Ensure the reviews field is an array
    if (!Array.isArray(video.reviews)) {
      return res.status(500).json({ message: 'Invalid reviews field structure' });
    }

    // Find the existing review by user
    const existingReview = video.reviews.find((r) => r.user.toString() === userId.toString());
    if (!existingReview) {
      return res.status(400).json({ message: 'Review does not exist. Please add a new review instead.' });
    }

    // Update the existing review
    existingReview.reviewText = reviewText;
    existingReview.rating = rating;
    existingReview.timestamp = Date.now(); // Update timestamp when review is edited

    await video.save();
    res.json({ message: 'Review updated', reviews: video.reviews });
  } catch (err) {
    console.error('Error updating review:', err.message);
    res.status(500).json({ error: 'Failed to update review', details: err.message });
  }
};




// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { email } = req.body; // Get email from the request body

    // Find the user by email
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id; // Retrieve user ID from the found user

    // Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Filter out the review from the reviews array
    const initialReviewCount = video.reviews.length;
    video.reviews = video.reviews.filter((r) => r.user.toString() !== userId.toString());

    // Check if any review was actually deleted
    if (initialReviewCount === video.reviews.length) {
      return res.status(404).json({ message: 'Review not found for this user' });
    }

    // Save the updated video document
    await video.save();

    res.json({ message: 'Review deleted successfully', reviews: video.reviews });
  } catch (err) {
    console.error('Error deleting review:', err.message);
    res.status(500).json({ error: 'Failed to delete review', details: err.message });
  }
};

