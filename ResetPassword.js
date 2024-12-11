import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email; // Retrieve email from state passed via navigation
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email){
      return handleError('Please login or do vai forgot password');
    }
    if (password !== confirmPassword) {
      return handleError('Passwords do not match');
    }
    try {
      const response = await fetch('http://localhost:8080/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email , password }), // Send email to the server along with passwords
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        navigate('/login'); // Redirect to login after successful password reset
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError('Failed to reset password');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f8f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#006d5b', textAlign: 'center', marginBottom: '20px' }}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='password' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>New Password</label>
            <input
              type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='confirmPassword' style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Confirm Password</label>
            <input
              type="password"
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px', fontSize: '16px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#006d5b', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Reset Password</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
