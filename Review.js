import React, { useState, useEffect } from 'react';
import Rvform from './Rvform';
import ReviewCard from './Reviewcard';

const Review = () => {
    const [reviews, setReviews] = useState([]);

   

    useEffect(() => {
        fetch('http://localhost:8080/reviews/all')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched reviews:', data); 
                setReviews(data.reviews || []); 
            })
            .catch(error => console.error('Error fetching reviews:', error));
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
