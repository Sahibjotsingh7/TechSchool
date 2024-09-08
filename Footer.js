import React from 'react';
import { FaPhoneAlt, FaMobileAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '50px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent:'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '30px', padding:'0 200px' }}>
        
        
        <div style={{ flex: '1', paddingRight: '20px' ,marginBottom: '30px' }}>
          <h3 style={{marginBottom: '30px'}}>Get in Touch</h3>
          <p style={{ margin: '10px' }}><FaMobileAlt style={{ marginRight: '10px' }} /> +123 456 7890</p>
          <p style={{ margin: '10px' }}><FaMobileAlt style={{ marginRight: '10px' }} /> +098 765 4321</p>
          <p style={{ margin: '10px' }}><FaPhoneAlt style={{ marginRight: '10px' }} /> +111 222 3333 (Landline)</p>
          <p style={{ margin: '10px' }} ><FaEnvelope style={{ marginRight: '10px' }} /> contact@techschool.com</p>

        
           <div style={{ marginBottom: '30px', marginTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
    <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Privacy</Link>
    <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Our Policy</Link>
    <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Help</Link>
    <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>Security</Link>
    <Link to="/lower" style={{ color: '#fff', margin: '0 15px', textDecoration: 'underline' }}>More</Link>
      </div>

          <div>
          <FaFacebook size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
          <FaTwitter size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
          <FaInstagram size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
          <FaLinkedin size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
          <FaYoutube size={30} style={{ margin: '0 10px', cursor: 'pointer' }} />
        </div>
        </div>

    
        <div style={{ flex: '1', paddingLeft: '20px', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ marginBottom: '15px' }}>Give Us Feedback</h3>
          <form action="https://api.web3forms.com/submit" method="POST" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <input type="hidden" name="access_key" value="58335020-0542-4ff5-814e-401557f0c7fb"/>
            <input 
              type="text" 
              placeholder="Name" 
              name='name'
              style={{ 
                padding: '10px', 
                marginBottom: '10px', 
                backgroundColor: 'transparent', 
                border: '1px solid white', 
                color: 'white', 
                outline: 'none',
                borderRadius: '5px' 
              
              }} 
            />
            <input 
              type="email" 
              name='email'
              placeholder="Email" 
              style={{ 
                padding: '10px', 
                marginBottom: '10px', 
                backgroundColor: 'transparent', 
                border: '1px solid white', 
                color: 'white', 
                outline: 'none', 
                borderRadius: '5px' 
              }} 
            />
            <textarea 
            name='feedback'
              placeholder="Feedback" 
              style={{ 
                padding: '10px', 
                backgroundColor: 'transparent', 
                border: '1px solid white', 
                color: 'white', 
                outline: 'none', 
                height: '100px',
                resize: 'none',
                borderRadius: '5px' 
              }} 
            />
            <input
              type="submit" 
              value="Submit"
              style={{ 
                marginTop: '10px', 
                padding: '10px', 
                backgroundColor: '#006d5b', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer', 
                borderRadius: '5px' 
              }}
            >
             
            </input>
          </form>
        </div>
      </div>

     

      <div style={{ borderTop: '1px solid #555', paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.9em' }}>
          &copy; 2024 TechSchool. All Rights Reserved.
        </div>
        
      </div>
    </div>
  );
}

export default Footer;
