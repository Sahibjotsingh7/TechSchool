import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility functions for toast
const showToast = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);

  const getUserEmail = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
    return storedUserInfo?.email;
  };

  const getUserId = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
    return storedUserInfo?.id;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
        if (!storedUserInfo?.token) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get("http://localhost:8080/videos/all", {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        });
        setVideos(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching videos");
      }
    };

    fetchVideos();
  }, []);

  const toggleLike = async (videoId) => {
    try {
      const email = getUserEmail();
      if (!email) {
        setError("User is not authenticated");
        return;
      }

      const id = getUserId();

      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId
            ? {
                ...video,
                likes: video.likes.includes(id)
                  ? video.likes.filter((likeId) => likeId !== id) // Unlike
                  : [...video.likes, id], // Like
              }
            : video
        )
      );

      const response = await axios.post(
        `http://localhost:8080/videos/${videoId}/like`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).token}`,
          },
        }
      );

      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId ? { ...video, likes: response.data.likes } : video
        )
      );

      showToast(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (video) => {
    setSelectedVideo(video);
    setReviews(video.reviews || []);
  
    const userID = getUserId();
    const userReview = video.reviews?.find((review) => review.user?._id === userID);
  
    if (userReview) {
      setReviewText(userReview.reviewText);
      setRating(userReview.rating);
    } else {
      setReviewText("");
      setRating(5);
    }
  };
  
  const closeModal = () => {
    setSelectedVideo(null);
    setReviewText("");
    setRating(5);
  };
  
  const handleReviewSubmit = async () => {
    try {
      const email = getUserEmail();
      if (!email) {
        setError("User is not authenticated");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:8080/videos/${selectedVideo._id}/addreview`,
        { reviewText, rating, email },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).token}`,
          },
        }
      );
  
      const updatedReviews = response.data.reviews;
      setReviews(updatedReviews); // Update reviews in state
      setSelectedVideo((prev) => ({ ...prev, reviews: updatedReviews })); // Update selected video reviews
      setReviewText("");
      setRating(5);
      showToast("Review added successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      showToast("Failed to submit review. Please try again.", "error");
    }
  };
  
  
  const handleUpdateReview = async () => {
  try {
    const email = getUserEmail();
    if (!email) {
      setError("User is not authenticated");
      return;
    }

    const response = await axios.put(
      `http://localhost:8080/videos/${selectedVideo._id}/updatereview`,
      { reviewText, rating, email },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).token}`,
        },
      }
    );

    const updatedReviews = response.data.reviews;
    setReviews(updatedReviews); // Update reviews in state
    setSelectedVideo((prev) => ({ ...prev, reviews: updatedReviews })); // Update selected video reviews
    showToast("Review updated successfully");
    window.location.reload();
  } catch (err) {
    console.error(err);
    showToast("Failed to update review. Please try again.", "error");
  }
};

  
  const handleDeleteReview = async (reviewId) => {
    try {
      const email = getUserEmail();
      if (!email) {
        setError("User is not authenticated");
        return;
      }
  
      const response = await axios.delete(
        `http://localhost:8080/videos/${selectedVideo._id}/review`,
        {
          data: { email },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).token}`,
          },
        }
      );
  
      setReviews(response.data.reviews);
      setSelectedVideo((prev) => ({ ...prev, reviews: response.data.reviews }));
      showToast("Review deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete review. Please try again.", "error");
    }
  };
  
  const renderReviewFormButtons = () => {
    const userID = getUserId();
    const userReview = reviews.find((review) => review.user?._id === userID);
  
    return userReview ? (
      <>
        <button style={styles.submitButton} onClick={handleUpdateReview}>
          Update Review
        </button>
        <button
          style={styles.submitButton}
          onClick={() => handleDeleteReview(userReview._id)}
        >
          Delete Review
        </button>
      </>
    ) : (
      <button style={styles.submitButton} onClick={handleReviewSubmit}>
        Submit Review
      </button>
    );
  };
  
  

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? "★" : "☆");
    }
    return stars.join("");
  };

  return (
    <div style={styles.container}>
      {videos.map((video) => (
        <div key={video._id} style={styles.videoCard} onClick={() => openModal(video)}>
          <iframe
            src={video.link}
            style={styles.iframe}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <div style={styles.videoInfo}>
            <h3 style={styles.videoTitle}>{video.name}</h3>
            <div style={styles.likesContainer}>
              {video.likes.includes(getUserId()) ? (
                <AiFillHeart
                  style={styles.heartIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(video._id);
                  }}
                />
              ) : (
                <AiFillHeart
                  style={styles.heartIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(video._id);
                  }}
                />
              )}
              <span>{video.likes.length}</span>
            </div>
          </div>
        </div>
      ))}

      {selectedVideo && (
        <Modal isOpen={true} onRequestClose={closeModal} style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.videoContainer}>
              <iframe
                src={selectedVideo.link}
                style={styles.fullscreenIframe}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>

            <div style={styles.reviewsContainer}>
              <h3>{selectedVideo.name}</h3>
              <p>{selectedVideo.description}</p>
              <div style={styles.reviewForm}>
                <h4>
                  {reviews.some((review) => review.user?._id === getUserId())
                    ? "Update your review"
                    : "Add a review"}
                </h4>
                <textarea
                  style={styles.input}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review"
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  style={styles.input}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                {renderReviewFormButtons()}
              </div>
              <h4>Reviews</h4>
              {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to leave one!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} style={styles.review}>
                    <p style={styles.reviewUser}>{review.username}</p>
                    <p style={styles.reviewText}>{review.reviewText}</p>
                    <p style={{color:"green"}}>{renderStars(review.rating)}</p>
                    <p style={styles.reviewTimestamp}>
                      {new Date(review.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    marginTop: "40px",
    padding: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  videoCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "450px",
    cursor: "pointer",
  },
  iframe: {
    borderRadius: "8px",
    width: "100%",
    height: "300px",
    border: "none",
  },
  videoInfo: {
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  likesContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  heartIcon: {
    fontSize: "22px",
    cursor: "pointer",
    color: "#e74c3c",
  },
  modal: {
    content: {
      marginTop: "28px",
      width: "95%",
      height: "620px",
      margin: "auto",
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "scroll",
    },
  },
  fullscreenIframe: {
    width: "100%",
    height: "500px",
    borderRadius: "8px",
  },
  videoContainer: {
    width: "100%",
    height: "auto",
    marginBottom: "20px",
  },
  reviewsContainer: {
    width: "50%",
    paddingLeft: "20px",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  review: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  reviewUser: {
    fontWeight: "bold",
  },
  reviewText: {
    fontSize: "1rem",
    color: "#333",
  },
  reviewTimestamp: {
    fontSize: "0.9rem",
    color: "#888",
  },
  reviewForm: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default VideoList;
