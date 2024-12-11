import React, { useState } from 'react';
import { FaPhoneAlt, FaMobileAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = ({ isLoggedIn, userEmail, userName }) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackSent(false);
    setErrorMessage('');

    if (!feedback) {
      setErrorMessage('Please provide feedback.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/feedback/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          feedback,
        }),
      });

      if (response.status === 201) {
        setFeedbackSent(true);
        setFeedback('');
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      setErrorMessage('Error sending feedback. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '50px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '30px', padding: '0 200px' }}>
        <div style={{ flex: '1', paddingRight: '20px', marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '30px' }}>Get in Touch</h3>
          <p style={{ margin: '10px' }}><FaMobileAlt style={{ marginRight: '10px' }} /> +123 456 7890</p>
          <p style={{ margin: '10px' }}><FaMobileAlt style={{ marginRight: '10px' }} /> +098 765 4321</p>
          <p style={{ margin: '10px' }}><FaPhoneAlt style={{ marginRight: '10px' }} /> +111 222 3333 (Landline)</p>
          <p style={{ margin: '10px' }} ><FaEnvelope style={{ marginRight: '10px' }} /> contact@techschool.com</p>

          <div style={{ marginBottom: '30px', marginTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Privacy</Link>
            <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Our Policy</Link>
            <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Help</Link>
            <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Security</Link>
            <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>More</Link>
          </div>

          <div>
            <FaFacebook size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
            <FaTwitter size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
            <FaInstagram size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
            <FaLinkedin size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
            <FaYoutube size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ flex: '1', paddingLeft: '20px', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ marginBottom: '15px' }}>Give Us Feedback OR Report a Bug</h3>
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <textarea
                name="feedback"
                placeholder="Feedback/Bug"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  outline: 'none',
                  height: '100px',
                  resize: 'none',
                  borderRadius: '5px',
                }}
              />
              {feedbackSent && <p style={{ color: 'green' }}>message sent successfully!</p>}
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <input
                type="submit"
                value="Submit"
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#006d5b',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              />
            </form>
          ) : (
            <div style={{ color: 'white' }}>
              <p>Please <span style={{ cursor: 'pointer', color: '#006d5b' }} onClick={handleFeedbackClick}>log in</span> to give feedback.</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #555', paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.9em' }}>
          &copy; 2024 TechSchool. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
