import React, { useState } from 'react';
import axios from 'axios';

function Compiler() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('py'); // Set default to Python
  const [output, setOutput] = useState('');
  const [userInputs, setUserInputs] = useState('');

  const handleUserInputChange = (e) => {
    setUserInputs(e.target.value.toString());
  };

  const handleSubmit = async () => {
    const payload = {
      language: language,
      code,
      userInputs, 
    };

    try {
      const { data } = await axios.post('http://localhost:8080/run', payload);
      setOutput(data.output || 'No output from the compiler');
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || 'An unknown error occurred.';
        const errorDetails = error.response.data.details || 'No additional error details.';
        setOutput(`Error: ${errorMessage}\nDetails: ${errorDetails}`);
      } else {
        setOutput('Error connecting to server');
      }
      console.error('Error during the request:', error.message || error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#e8f5e9', // Light green background
        color: '#1b5e20', // Dark green text
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '90%',
        margin: '0 auto',
        marginTop:"100px"
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>TechBase Code Compiler</h1>
      <br />

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Language: </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #2e7d32' }}
        >
          <option value="py">Python</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>User Inputs (comma separated, e.g., 5, 10): </label>
        <input
          type="text"
          value={userInputs}
          onChange={handleUserInputChange}
          placeholder="Enter inputs here"
          style={{
            width: '98%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #2e7d32',
            marginTop: '5px',
          }}
        />
      </div>

      <textarea
        rows="200"
        cols="75"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        style={{
          width: '98%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #2e7d32',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '15px',
          height:"300px"
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#2e7d32',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Compile and Run
      </button>
      <p
        style={{
          color: '#d32f2f', // Red for errors
          whiteSpace: 'pre-wrap',
          backgroundColor: '#fbe9e7', // Light red background
          padding: '10px',
          borderRadius: '5px',
          marginTop: '15px',
        }}
      >
       <span style={{
         height:"200px",
         width:"100%",
         overflow:"scroll"

       }}>{output}</span> 
      </p>
    </div>
  );
}

export default Compiler;
