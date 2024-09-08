const ReviewModel = require('../Models/review')
const addReview = async (req, res) => { 
    try {
        const { name, course, feedback, rating } = req.body;
        const newReview = new ReviewModel({ name, course, feedback, rating });
        await newReview.save();
        res.status(201).json({ message: "Review Added", success: true });
    } catch (error) {
        console.error("Error saving review:", error); 
        res.status(500).json({ message: "Failed", success: false });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find(); 
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
};

module.exports = { addReview, getAllReviews };

