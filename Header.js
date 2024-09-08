import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import techLogo from './techlogo.png'; 

const Header = ({ loged, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div style={headerStyle}>
      <div style={logoContainerStyle}>
        <img src={techLogo} alt="TechSchool" style={logoStyle} />
      </div>
      <nav style={navContainerStyle}>
        <NavLink to="/" style={navLinkStyle} activeStyle={activeLinkStyle}>Home</NavLink>
        <NavLink to="/about" style={navLinkStyle} activeStyle={activeLinkStyle}>About</NavLink>
        <NavLink to="/tutorial" style={navLinkStyle} activeStyle={activeLinkStyle}>Tutorials</NavLink>
        <NavLink to="/notes" style={navLinkStyle} activeStyle={activeLinkStyle}>Notes</NavLink>
        <NavLink to="/review" style={navLinkStyle} activeStyle={activeLinkStyle}>Reviews</NavLink>
      </nav>
      <div style={authContainerStyle}>
        {loged.status ? (
          <>
            <FaRegUserCircle style={iconStyle} />
            <span style={userInfoStyle}>{loged.name}</span>
            <button style={authButtonStyle} onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <button style={authButtonStyle} onClick={() => navigate('/signup')}>Sign Up</button>
            <button style={authButtonStyle} onClick={() => navigate('/login')}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

const headerStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  padding: '0 20px',
  boxSizing: 'border-box',
  zIndex: 1000,
  fontFamily: 'Arial, sans-serif',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const logoContainerStyle = {
  flex: 1,
};

const logoStyle = {
  height: '40px',
  background: 'transparent',
};

const navContainerStyle = {
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const navLinkStyle = {
  color: 'black',
  fontSize: '16px',
  margin: '0 10px',
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  transition: 'background-color 0.3s, color 0.3s',
};

const activeLinkStyle = {
  color: 'green',
  fontWeight: 'bold',
  borderBottom: '2px solid green',
};

const authContainerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const iconStyle = {
  fontSize: '24px',
  color: 'green',
  marginRight: '8px',
};

const userInfoStyle = {
  fontSize: '16px',
  color: 'green',
  marginRight: '20px',
};

const authButtonStyle = {
  backgroundColor: 'green',
  border: 'none',
  color: 'white',
  fontSize: '14px',
  padding: '8px 16px',
  borderRadius: '20px',
  cursor: 'pointer',
  marginLeft: '10px',
  transition: 'background-color 0.3s',
};

export default Header;
