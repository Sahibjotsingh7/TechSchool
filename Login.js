import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from './utils';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = ({ logg }) => {
  const [logininfo, setLogininfo] = useState({ email: '', password: '' });
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();

  function changehandler(e) {
    const { name, value } = e.target;
    setLogininfo({ ...logininfo, [name]: value });
  }

  async function handleLogin(event) {
    event.preventDefault();
    const { email, password } = logininfo;
    if (!email || !password) {
      return handleError('Both fields are required');
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logininfo)
      });
      const result = await response.json();
      const { success, error, message, name } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/'); 
        }, 1000);
        logg(name, email, true); 
      } else {
        handleError(error ? error : message);
        logg("", "", false);
      }
    } catch (error) {
      handleError(error.message);
      logg("", "", false);
    }
  }

  return (
    <div style={{ backgroundColor: '#f0f8f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#006d5b', textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='email' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Email</label>
            <input type="email" name='email' value={logininfo.email} onChange={changehandler} placeholder="Enter your email" autoFocus style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px', fontSize: '16px' }} />
          </div>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label htmlFor='password' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Password</label>
            <input type={showpassword ? 'text' : 'password'} name='password' value={logininfo.password} onChange={changehandler} placeholder="Enter your password" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px', fontSize: '16px' }} />
            <span onClick={() => setShowpassword(!showpassword)} style={{ position: 'absolute', right: '10px', top: '38px', cursor: 'pointer', zIndex: 1 }}>
              {showpassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#006d5b', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Login</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#006d5b', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
