// Prectice.js
import React from 'react';
import { FaCode, FaLaptopCode, FaDatabase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Prectice = () => {
  const navigate = useNavigate();

  const quizTypes = [
    { name: 'Development', icon: <FaLaptopCode style={{color: 'blueviolet', fontSize: '50px', marginRight: '10px'}} />, description: 'Test your skills in JavaScript, React, Node.js, and more.', img: 'https://th.bing.com/th/id/OIP._xoaCf6j3RyWO2xkXI_9EAHaE7?w=254&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', path: '/development' },
    { name: 'Coding', icon: <FaCode style={{color: 'green', fontSize: '50px', marginRight: '10px'}} />, description: 'Practice with languages like C++, Python, Java, and more.', img: 'https://i.pinimg.com/736x/de/d6/a6/ded6a6e9d3038bf42784ee8cec698bed.jpg', path: '/coding' },
    { name: 'Basics', icon: <FaDatabase style={{color: 'orangered', fontSize: '50px', marginRight: '10px'}} />, description: 'Master core concepts in OS, DBMS, CN, and OOPs.', img: 'https://static.vecteezy.com/system/resources/previews/002/794/133/original/young-woman-working-on-laptop-freelance-or-studying-concept-cute-trendy-illustration-in-flat-style-free-vector.jpg', path: '/basics' }
  ];

  return (
    <div >
      <h1 style={{ textAlign: 'center', marginTop:"100px" }}>Let's Practice MCQs</h1>
      <div style={styles.container}>
        {quizTypes.map((quiz, index) => (
          <div key={index} style={styles.card}>
            <img style={styles.image} src={quiz.img} alt={quiz.name}></img>
            <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{quiz.icon} {quiz.name}</h2>
            <p style={{ padding: '0 10px' }}>{quiz.description}</p>
            <button style={styles.button} onClick={() => navigate(quiz.path)}>Practice Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '350px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '0px',
    paddingBottom: '10px',
  },
  image: {
    width: '350px',
    height: '250px',
    borderRadius: '10px 10px 0px 0px',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '200px',
    marginTop: '10px',
  },
};

export default Prectice;
