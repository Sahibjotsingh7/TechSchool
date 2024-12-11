import React, { useState, useEffect } from 'react';
import Rvform from './Rvform';
import ReviewCard from './Reviewcard';

const Review = () => {
    const [reviews, setReviews] = useState([]);

   

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const storedUserInfo = JSON.parse(localStorage.getItem('loginInfo'));
      
            if (!storedUserInfo || !storedUserInfo.token) {
              throw new Error('User is not authenticated');
            }
      
            const response = await fetch('http://localhost:8080/reviews/all', {
              headers: {
                Authorization: `Bearer ${storedUserInfo.token}`,
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch reviews');
            }
      
            const data = await response.json();
            console.log('Fetched reviews:', data); // Debugging log
            setReviews(data.reviews || []); // Update state with fetched reviews
          } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews([]); // Clear reviews on error
          }
        };
      
        fetchReviews();
      }, []);
      
    

    const handleNewReview = (name, course, feedback, rating) => {
        const newReview = { name, course, feedback, rating };
        setReviews([...reviews, newReview]);
    };

    return (
        <div style={{padding:'50px 120px' }}>
            <h1 style={{textAlign:'center', margin:'40px'}}>Give Your Valuable Review</h1>
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <Rvform getreview={handleNewReview} />
            </div>
            <div style={styles.reviewsContainer}>
                <div style={styles.reviewsList}>
                    {reviews.map((review, index) => (
                        <ReviewCard 
                            key={index}
                            name={review.name}
                            course={review.course}
                            feedback={review.feedback}
                            rating={review.rating}
                        />
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px'
    },
    formContainer: {
        flex: '1',
        maxWidth: '45%',
    },
    reviewsContainer: {
        flex: '1',
        maxWidth: '45%',
        overflowY: 'scroll',
        maxHeight: '500px',
    },
    reviewsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflowY: 'scroll',
     

    }
};

export default Review;
