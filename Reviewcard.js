import React from 'react';
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const ReviewCard = ({ name, course, feedback, rating }) => {
    return (
        <div style={styles.card}>
            <h3 style={{margin:'5px 0 '}}>{name}</h3>
            <h4 style={{margin:'5px 0 '}}>{course}</h4>
            <p style={{margin:'5px 0 '}}>{feedback}</p>
            <div style={styles.rating}>
                {[...Array(5)].map((_, index) => 
                    index < rating 
                    ? <span key={index} style={styles.star}><IoMdStar /> </span> 
                    : <span key={index} style={styles.star}><IoMdStarOutline></IoMdStarOutline></span>
                )}
            </div>
        </div>
    );
};

const styles = {
    card: {
        padding: '15px',
        background: '#f0fdf4',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
    },
    rating: {
        color: 'green',
    },
    star: {
        fontSize: '20px',
    }
};

export default ReviewCard;
