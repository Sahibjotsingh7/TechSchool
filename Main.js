import React from 'react';
import Add from './Add';
import Note from './Note';
import {  useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div style={{ 
      backgroundColor: '#f0fdf4', 
      color: '#065f46', 
      padding: '50px 0px', 
      textAlign: 'center', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      paddingTop:'100px'
    }}>
      <h1 style={{ fontSize: '3em', fontWeight: 'bold' }}>
        Empower Your Future with Knowledge
      </h1>
      <p style={{ fontSize: '1.5em', margin: '20px 0' }}>
        "The more you learn, the more you earn." - Warren Buffett
      </p>
      <p style={{ fontSize: '1.5em', margin: '20px 0' }}>
        Explore tutorials on coding, algorithms, data structures, and all core subjects of Computer Science.
      </p>
      <button style={{ 
        backgroundColor: '#065f46', 
        color: '#ffffff', 
        padding: '15px 30px', 
        fontSize: '1.2em', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer',
        marginTop: '30px'
      }} onClick={() => {navigate('/tutorial')}}>
        Start Learning
      </button>
      <div style={{ 
        marginTop: '50px', 
        fontSize: '1.2em', 
        fontStyle: 'italic' 
      }}>
        "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
      </div>
      <div style={{margin:"100px 0"}}>
         <img src='https://cdn01.alison-static.net/public/html/site/img/homepage/banner-image.svg' alt='aa'></img>
      </div>
      <Add></Add>
      <Note></Note>
    </div>
  );
}

export default Main;
