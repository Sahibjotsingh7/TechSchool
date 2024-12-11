import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import Review from './Review';
import Notes from './Notes';
import { handleSuccess, handleError } from './utils';
import 'react-toastify/dist/ReactToastify.css';
import Tutorial from './Tutorial';
import Lower from './Lower';
import About from './About';
import Prectice from './Prectice';
import CodePrectice from "./CodePrectice";
import BasicPrectice from "./BasicPrectice";
import DevPrectice from "./DevPrectice";
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';
import HelpPage from './Help';
import SingleVideo from './SingleVideo';
import Compiler from './Compiler';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    name: '',
    email: '',
    status: false,
    token: ''
  });

  const [loading, setLoading] = useState(true);

  // Fetch login info from localStorage and validate token on page load
  useEffect(() => {
    const storedLoginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if (storedLoginInfo && storedLoginInfo.status) {
      const { token } = storedLoginInfo;
      if (isTokenExpired(token)) {
        handleLogout(); // Logout if token is expired
      } else {
        setIsLoggedIn(storedLoginInfo);
      }
    }
    setLoading(false);
  }, []);

  // Check if token is expired based on the expiration time in the token
  function isTokenExpired(token) {
    if (!token) return true;
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    const expirationTime = decoded.exp * 1000; // exp is in seconds, convert to ms
    return Date.now() > expirationTime; // Compare current time with expiration time
  }

  // Handle login status updates
  function handleLoginStatus(name, email, status, token) {
    const loginInfo = { name, email, status, token };
    setIsLoggedIn(loginInfo);
    console.log(loginInfo);
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
  }

  // Handle user logout
  function handleLogout() {
    setIsLoggedIn({ name: '', email: '', status: false, token: '' });
    localStorage.removeItem('loginInfo');
    handleSuccess('Logged out successfully');
  }

  // Show loading indicator while checking login status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header loged={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login logg={handleLoginStatus} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={isLoggedIn.status ? (
            <Dashboard user={isLoggedIn} handleLoginStatus={handleLoginStatus} />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="/tutorial" element={isLoggedIn.status ? <Tutorial /> : <Navigate to="/login" />} />
        <Route path="/notes" element={isLoggedIn.status ? <Notes /> : <Navigate to="/login" />} />
        {/*<Route path="/review" element={isLoggedIn.status ? <Review /> : <Navigate to="/login" />} />*/}
        <Route path="/prectice" element={isLoggedIn.status ? <Prectice /> : <Navigate to="/login" />} />
        <Route path="/help" element={isLoggedIn.status ? <HelpPage /> : <Navigate to="/login" />} />
        <Route path="/lower" element={<Lower />} />
        <Route path="/coding" element={<CodePrectice />} />
        <Route path="/development" element={<DevPrectice />} />
        <Route path="/basics" element={<BasicPrectice />} />
        <Route path="/video" element={isLoggedIn.status ? <SingleVideo /> : <Navigate to="/login" />} />
        <Route path="/compiler" element={isLoggedIn.status ? <Compiler /> : <Navigate to="/login" />} />

      </Routes>
    </div>
  );
}

export default App;
