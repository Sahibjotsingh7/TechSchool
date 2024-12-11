import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Utility functions for toast
const showToast = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

const SingleVideo = ({ location }) => {
  // Defensive check for location.state and location.state.video
  const video = location?.state?.video || {}; // Fallback to an empty object if undefined
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [currentVideo, setCurrentVideo] = useState(video); // Initialize video state

  const getUserEmail = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
    return storedUserInfo?.email;
  };

  const getUserId = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
    return storedUserInfo?.id;
  };

  useEffect(() => {
    if (!video._id) {
      setError("Video not found");
      return;
    }

    const fetchReviews = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
        if (!storedUserInfo?.token) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get(`http://localhost:8080/videos/${video._id}/reviews`, {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        });

        setReviews(response.data.reviews);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching reviews");
      }
    };

    fetchReviews();
  }, [video._id]);

  const toggleLike = async () => {
    try {
      const email = getUserEmail();
      if (!email) {
        setError("User is not authenticated");
        return;
      }

      const id = getUserId();

      setCurrentVideo((prev) => ({
        ...prev,
        likes: prev.likes.includes(id)
          ? prev.likes.filter((likeId) => likeId !== id)
          : [...prev.likes, id],
      }));

      const response = await axios.post(
        `http://localhost:8080/videos/${video._id}/like`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).token}`,
          },
        }
      );

      setCurrentVideo((prev) => ({
        ...prev,
        likes: response.data.likes,
      }));

      showToast(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const email = getUserEmail();
      if (!email) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/videos/${video._id}/addreview`,
        { reviewText, rating, email },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).token}`,
          },
        }
      );

      setReviews(response.data.reviews);
      setReviewText("");
      setRating(5);
      showToast("Review added successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to submit review. Please try again.", "error");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? "★" : "☆");
    }
    return stars.join("");
  };

  if (!video._id) {
    return <p>Error: Video not found or invalid link</p>;
  }

  return (
    <div className="single-video-container">
      <div className="video-container">
        <iframe
          src={currentVideo.link}
          className="fullscreen-iframe"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <h3>{currentVideo.name}</h3>
        <div className="likes-container">
          {currentVideo.likes.includes(getUserId()) ? (
            <AiFillHeart className="heart-icon" onClick={toggleLike} />
          ) : (
            <AiOutlineHeart className="heart-icon" onClick={toggleLike} />
          )}
          <span>{currentVideo.likes.length}</span>
        </div>
      </div>

      <div className="review-section">
        <h4>Add a Review</h4>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleReviewSubmit}>Submit Review</button>

        <h4>Reviews</h4>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review">
              <p>
                <strong>{review.username}</strong>
              </p>
              <p>{review.reviewText}</p>
              <p>Rating: {renderStars(review.rating)}</p>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleVideo;
