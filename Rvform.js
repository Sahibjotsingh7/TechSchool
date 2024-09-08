import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSuccess, handleError } from './utils';

const Rvform = ({ getreview }) => {
    const [formname, setFormname] = useState('');
    const [formcourse, setFormcourse] = useState('');
    const [formreview, setFormreview] = useState('');
    const [rating, setRating] = useState(0);

    function submithandle(event) {
        event.preventDefault();
        
        fetch('http://localhost:8080/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formname, 
                course: formcourse, 
                feedback: formreview, 
                rating
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                handleSuccess('Review saved successfully');
                getreview(formname, formcourse, formreview, rating);
            } else {
                handleError('Failed to save review');
            }
        })
        .catch(error => {
            console.error("Error during fetch:", error); 
            handleError('An error occurred while saving the review');
        });
    
        // Clear the form inputs
        setFormname('');
        setFormcourse('');
        setFormreview('');
        setRating(0);
    }

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '20px',
        },
        inputField: {
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginBottom: '10px',
        },
        starRating: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            color: '#ffcc00',
        },
        textarea: {
            width: '100%',
            height: '100px',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginBottom: '20px',
            resize: 'none',
        },
        submitButton: {
            width: '100%',
            padding: '15px',
            background: '#004d00',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background 0.3s',
        },
        submitButtonHover: {
            background: '#003300',
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={submithandle} style={styles.form}>
                <div style={styles.inputGroup}>
                    <input 
                        type='text' 
                        placeholder='Enter Your Name' 
                        style={styles.inputField} 
                        value={formname}
                        onChange={(e) => setFormname(e.target.value)}
                        required
                    />
                    <input 
                        type='text' 
                        placeholder='Enter Name Of Tutorial' 
                        style={styles.inputField} 
                        value={formcourse}
                        onChange={(e) => setFormcourse(e.target.value)}
                        required
                    />
                </div>
                <textarea 
                    placeholder='Write your review here...' 
                    style={styles.textarea}
                    value={formreview}
                    onChange={(e) => setFormreview(e.target.value)}
                    required
                ></textarea>
                <div style={styles.starRating}>
                    {[...Array(5)].map((_, index) => 
                        index < rating 
                        ? <IoMdStar key={index} size={30} style={{ color: 'green', cursor: 'pointer' }} onClick={() => setRating(index + 1)} /> 
                        : <IoMdStarOutline key={index} size={30} style={{ color: 'green', cursor: 'pointer' }} onClick={() => setRating(index + 1)} />
                    )}
                </div>
                <input 
                    type='submit' 
                    value='Submit Review' 
                    style={styles.submitButton}
                    onMouseOver={(e) => e.currentTarget.style.background = styles.submitButtonHover.background}
                    onMouseOut={(e) => e.currentTarget.style.background = styles.submitButton.background}
                />
            </form>
        </>
    );
}

export default Rvform;
