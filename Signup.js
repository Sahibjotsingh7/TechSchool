import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useState } from 'react';
import { handleError, handleSuccess } from './utils';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Signup = () => {
  const [signupinfo, setSignupinfo] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); 
  const[showpassword,setShowpassword] = useState(false);

  function changehandler(e) {
    const { name, value } = e.target;
    const copyinfo = { ...signupinfo };
    copyinfo[name] = value;
    setSignupinfo(copyinfo);
  }

  async function handleSign(event) {
    event.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return handleError('All Fields are Required');
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupinfo)
      });
      const result = await response.json();
      const { success, error, message } = result;
      console.log(result);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login'); // Navigate to login page
        }, 1000);
      } else if (error || !success) {
        handleError(error ? error : message);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  return (
    <div style={{
      backgroundColor: '#f0f8f5',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{
          color: '#006d5b',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Sign Up
        </h2>
        <form onSubmit={handleSign}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='name' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Name</label>
            <input type="text"
              placeholder="Enter your name"
              name='name'
              value={signupinfo.name}
              onChange={changehandler}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                fontSize: '16px'
              }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='email' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Email</label>
            <input type="email" value={signupinfo.email}
              placeholder="Enter your email" name='email' onChange={changehandler}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                fontSize: '16px'
              }} />
          </div>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label htmlFor='password' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Password</label>
            <input type={showpassword ? 'text' : 'password'}
              value={signupinfo.password}
              placeholder="Enter your password"
              name='password'
              onChange={changehandler} style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                fontSize: '16px'
              }} />
            <span 
              onClick={() => setShowpassword(!showpassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '38px',
                cursor: 'pointer',
                zIndex: 1 
              }}>
              {showpassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input type="submit" value={'Sign Up'} style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#006d5b',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
          </input>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>
            Already have an account? <Link to="/login" style={{ color: '#006d5b', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
