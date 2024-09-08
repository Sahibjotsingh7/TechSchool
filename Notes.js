import React, { useState, useEffect } from 'react';
import { AiOutlineArrowRight, AiOutlineFileText} from 'react-icons/ai';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:8080/notes/notes');
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
  };

 
  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>Download Notes by Experts</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{ 
              width: '300px', 
              padding: '20px', 
              background: '#f9f9f9', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              textAlign: 'center'
            }}
          >
            <div style={{ marginBottom: '10px' }}>
            <AiOutlineFileText size={50} color="red" />
            </div>
            <h2>{note.language}</h2>
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
                gap: '10px',
                margin: '20px auto'
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
