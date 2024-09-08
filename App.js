import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import Review from './Review';
import Notes from './Notes';
import { handleSuccess } from './utils';
import 'react-toastify/dist/ReactToastify.css';
import Tutorial from './Tutorial';
import Lower from './Lower';
import About from './About';

function App() {
  

  const [isLoggedIn, setIsLoggedIn] = useState({
    name: '',
    email: '',
    status: false,
  });

  useEffect(() => {
    const storedLoginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if (storedLoginInfo && storedLoginInfo.status) {
      setIsLoggedIn(storedLoginInfo); 
    }
  }, []);

  function handleLoginStatus(name, email, status) {
    const loginInfo = { name, email, status };
    setIsLoggedIn(loginInfo);
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo)); 
  }

  
  function handleLogout() {
    setIsLoggedIn({ name: '', email: '', status: false });
    localStorage.removeItem('loginInfo'); 
    handleSuccess('Logged out successfully'); 
  }

  return (
    <div className="App">
      <Header loged={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login logg={handleLoginStatus} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/tutorial"
          element={isLoggedIn.status ? <Tutorial /> : <Navigate to="/login" />}
        />
        <Route
          path="/notes"
          element={isLoggedIn.status ? <Notes /> : <Navigate to="/login" />}
        />
        <Route
          path="/review"
          element={isLoggedIn.status ? <Review /> : <Navigate to="/login" />}
        />
        <Route path="/lower" element={<Lower />} />
      </Routes>
    </div>
  );
}

export default App;
