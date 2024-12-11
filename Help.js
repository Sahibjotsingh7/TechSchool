import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { handleError } from './utils';
import 'react-toastify/dist/ReactToastify.css';

const HelpPage = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null); // Reference for the chat box container

  // Scroll to the bottom of the chat box
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return handleError('Please enter a query!');
    }

    setIsLoading(true);

    const token = JSON.parse(localStorage.getItem('loginInfo'))?.token; // Get the token from localStorage

    if (!token) {
      setIsLoading(false);
      return handleError('Authentication token not found. Please log in.');
    }

    // Show the "Bot is typing..." message
    setResponses([
      ...responses,
      { type: 'user', message: query },
      { type: 'bot', message1: "wait...", message2: "Bot is typing..." },
    ]);
    scrollToBottom(); // Scroll after adding "Bot is typing..." message

    try {
      const response = await fetch('http://localhost:8080/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add token to headers
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      // Add a delay before showing the actual response
      setTimeout(() => {
        if (result.success) {
          if (result.topMatches.length <= 0) {
            // If no matches are found
            setResponses((prevResponses) => [
              ...prevResponses.slice(0, -1), // Remove "wait..." message
              { type: 'bot', message1: "try again", message2: "Sorry, no relevant FAQs found. Try rephrasing your question." },
            ]);
          } else {
            // Show the matched FAQs
            setResponses((prevResponses) => [
              ...prevResponses.slice(0, -1), // Remove "wait..." message
              ...result.topMatches.map((match) => ({
                type: 'bot',
                message1: match.q,
                message2: match.a,
              })),
            ]);
          }
        } else {
          // If the API call fails or success is false
          setResponses((prevResponses) => [
            ...prevResponses.slice(0, -1), // Remove "wait..." message
            { type: 'bot', message1: "try again", message2: "Sorry, no relevant FAQs found. Try rephrasing your question." },
          ]);
        }
        setQuery('');
        scrollToBottom(); // Scroll after updating responses
      }, 1000); // Delay of 2 seconds (adjust as needed)
    } catch (error) {
      handleError('Failed to fetch chatbot response.');
      setResponses((prevResponses) => [
        ...prevResponses.slice(0, -1), // Remove "wait..." message
        { type: 'bot', message1: "try again", message2: "Sorry, an error occurred. Please try again later." },
      ]);
      scrollToBottom(); // Scroll after handling the error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom(); // Ensure scroll updates for initial rendering or changes
  }, [responses]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.chatContainer}>
        <h2 style={styles.pageTitle}>TechSchool Help</h2>
        <form onSubmit={handleSubmit} style={styles.inputForm}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Have a question? Ask our chatbot for assistance!"
            style={styles.inputField}
          />
          <button type="submit" style={styles.submitButton}>
            <FaSearch />
          </button>
        </form>

        <div ref={chatBoxRef} style={styles.chatBoxContainer}>
          <div style={styles.chatBox}>
            {responses.map((response, index) => (
              <div
                key={index}
                style={response.type === 'user' ? styles.userMessage : styles.botMessage}
              >
                <p style={{ fontWeight: "bold" }}> {response.message1}</p>
                {response.message2}
              </div>
            ))}
            {isLoading && <div style={styles.botMessage}>Bot is typing...</div>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  chatContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  pageTitle: {
    color: '#006d5b',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  chatBoxContainer: {
    position: 'relative',
    height: '300px',
    overflowY: 'auto', // Enable scrolling
    marginBottom: '20px',
    backgroundColor: "aliceblue",
    borderRadius: "10px",
    padding:"10px"
  },
  chatBox: {
    padding: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  userMessage: {
    backgroundColor: '#e1ffe1',
    padding: '10px',
    borderRadius: '12px',
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  botMessage: {
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '12px',
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  inputForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: "10px 10px"
  },
  inputField: {
    width: '85%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  submitButton: {
    backgroundColor: '#006d5b',
    border: 'none',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default HelpPage;
