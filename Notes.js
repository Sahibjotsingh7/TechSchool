import React, { useState, useEffect } from 'react';
import { AiOutlineArrowRight, AiOutlineFileText} from 'react-icons/ai';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem('loginInfo'));
        if (!storedUserInfo.token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://localhost:8080/notes/notes', {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDownload = (downloadUrl) => {
    window.open(downloadUrl, '_blank');
  }

 
  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>Download Notes/Cheetsheets by Experts</h1>
      <div style={{  justifyContent: 'center', gap: '20px' }}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{ 
              display: "flex",
              alignItems:"center",
              justifyContent:"space-between",
              width: '90%', 
              padding: '20px', 
              background: '#f9f9f9', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              textAlign: 'center',
              marginTop:"20px"
            }}
          >
            <div style={{}}>
            <AiOutlineFileText size={50} color="red" />
            <span style={{marginLeft:"10px" , marginBottom:"10px", fontWeight:"bold", fontSize:"25px"}}>{note.language}</span>
            </div>
           
            <p>{note.description}</p>
            <button
              onClick={() => handleDownload(note.downloadUrl)}
              style={{ 
                background: 'green', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Download Now <AiOutlineArrowRight />

              
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
