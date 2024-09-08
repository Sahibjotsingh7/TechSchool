import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  title: {
    textAlign: 'center',
    color: '#00796b', 
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  videoCard: {
    background: 'white',
    border: '1px solid #ddd', 
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    textAlign: 'left', 
    width:'450px'
  },
  videoFrame: {
    border: 'none',
    width: '450px',
    height: '250px', 
    maxWidth: '100%', 
    borderTopLeftRadius: '10px', 
    borderTopRightRadius: '10px', 
  },
  videoInfo: {
    padding: '1rem',
  },
  videoTitle: {
    color: 'black', 
    fontSize: '1.5rem',
    margin: '0.5rem 0',
  },
  videoDescription: {
    color: '#555', 
    fontSize: '1rem',
  },
};

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8080/videos/videos')
      .then(response => setVideos(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{padding:'100px 50px', display:'flex', flexWrap:'wrap' ,  gap:'35px' }}>
      {videos.map((video) => (
        <div key={video._id} style={styles.videoCard}>
          <iframe 
            src={video.link} 
            style={styles.videoFrame}
            allow="autoplay; encrypted-media" 
            allowFullScreen
          ></iframe>
          <div style={styles.videoInfo}>
            <h3 style={styles.videoTitle}>{video.name}</h3>
            <p style={styles.videoDescription}>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
