import React, { useState, useEffect } from 'react';
import { FaAlignJustify, FaRegUserCircle } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from './utils';

const Dashboard = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem('loginInfo'));
  const [user, setUser] = useState(null);
  const [emailChange, setEmailChange] = useState({
    oldEmail: '',
    newEmail: '',
    password: '',
  });
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(storedUserInfo)

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if (storedUserInfo && !isTokenExpired(storedUserInfo.token)) {
        console.log(storedUserInfo)
      setUser(storedUserInfo);
    } else {
      handleError('Your session has expired, please login again.');
      navigate('/login');
    }
  }, []);

  function isTokenExpired(token) {
    if (!token) return true;
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    const expirationTime = decoded.exp * 1000; // exp is in seconds, convert to ms
    return Date.now() > expirationTime; // Compare current time with expiration time
  }

  const submitEmailChange = async () => {
    const currentEmail = storedUserInfo?.email; // Automatically fetch the old email from localStorage
    const { newEmail, password } = emailChange;
  
    if (!newEmail || !password) {
      return handleError('All fields are required.');
    }
  
    try {
      const response = await fetch('http://localhost:8080/auth/reset-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEmail, newEmail, password }), // Use the fetched currentEmail
      });
  
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
  
        // Optionally update the local storage if the email change impacts the stored data
        const updatedUserInfo = { ...JSON.parse(localStorage.getItem('loginInfo')), email: newEmail };
        localStorage.setItem('loginInfo', JSON.stringify(updatedUserInfo));
        window.location.reload();
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError('Failed to update email.');
    }
  };
  
  

  const deleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) {
        return; // Abort if the user clicks "Cancel"
    }

    console.log('Deleting account for:', storedUserInfo.email);
    setDeleting(true);

    try {
        const response = await fetch('http://localhost:8080/auth/delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: storedUserInfo.email }), // Send as JSON object
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {
            handleSuccess(result.message);
            localStorage.removeItem('loginInfo');
            window.location.reload();
            navigate('/login');
        } else {
            handleError(result.message);
        }
    } catch (error) {
        handleError('Failed to delete account.');
    } finally {
        setDeleting(false);
    }
};


  const navigateToResetPassword = () => {
    navigate('/reset-password', { state: { email: user.email } });
  };

  return (
    <div style={styles.dashboardContainer}>
      {user ? (
        <div style={styles.dashboardContent}>
          <div style={styles.dashboardHeader}>
         <div><FaRegUserCircle style={styles.userIcon} /></div>   
           <div>
           <h2 style={styles.welcomeText}>Welcome back, {user.name}</h2>
            <p style={{fontSize:"30px" , marginTop:"20px"}}> {user.email}</p>
            <div><button style={styles.button} onClick={navigateToResetPassword}>Change Password</button>
            <button
              style={styles.deleteButton}
              onClick={deleteAccount}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div> 
           </div>
          </div>
         

          <div style={styles.emailChangeSection}>
            <h3 style={styles.sectionTitle}>Update Email</h3>
            <div style={styles.inputGroup}>
              <input
                type="email"
                name="newEmail"
                placeholder="New Email"
                value={emailChange.newEmail}
                onChange={handleInputChange}
                style={styles.inputField}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={emailChange.password}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <button style={styles.button} onClick={submitEmailChange}>Submit Email Change</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </div>
  );
};

const styles = {
  dashboardContainer: {

    fontFamily: 'Arial, sans-serif',
    maxWidth: '100%',
    height:"100vh",
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display:"flex",
    alignItems:"center",
    justifyContent:"center",


  },
  dashboardContent: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    width:"800px"

  },
  dashboardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  userIcon: {
    fontSize: '200px',
    marginRight: '20px',
    color: 'green',
  },
  welcomeText: {
    margin: '0',
    fontSize: '24px',
    color: '#333',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#365dbf',
  },
  emailChangeSection: {
    marginTop: '30px',
    fontSize:"40px"
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '15px',
  },
  inputGroup: {
    marginBottom: '20px',
    marginRight:"20px"
  },
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  deleteAccountSection: {
    marginTop: '30px',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    margin:"20px"
  },
};

export default Dashboard;
