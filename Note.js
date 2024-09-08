import React, { useState, useEffect } from 'react';
import { GrNotes } from "react-icons/gr";
import { AiOutlineArrowRight } from 'react-icons/ai';
import { TbBrandJavascript } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { ImHtmlFive2 } from "react-icons/im";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Note = () => {
  const navigate = useNavigate();
  const notes = [
    {
      id: 1,
      language: "JavaScript",
      color: "#f7df1e", // Dark Yellow
      icon: <TbBrandJavascript />,
      description: "JavaScript Notes by Experts",
    },
    {
      id: 2,
      language: "Python",
      color: "green", // Python Green
      icon: <FaPython />,
      description: "Python Notes by Experts",
    },
    {
      id: 3,
      language: "HTML",
      color: "orange", // HTML Orange
      icon: <ImHtmlFive2 />,
      description: "HTML Notes by Experts",
    },
    {
      id: 4,
      language: "Java",
      color: "pink", // Java Pink
      icon: <FaJava />,
      description: "Java Notes by Experts",
    },
    {
      id: 5,
      language: "C++",
      color: "blue", // C++ Blue
      icon: <TbBrandCpp />,
      description: "C++ Notes by Experts",
    },
  ];

  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notes.length);
    }, 1500);

    return () => clearInterval(interval); 
  }, [notes.length]);

  const currentNote = notes[currentNoteIndex];

  return (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        Want to Learn Offline? Download Notes by Experts
      </h1>
      <div style={{
        height: '200px',
        width: '500px',
        background: '#f9f9f9',
        borderRadius: '20px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }} onClick={()=>{navigate('/notes')}}>
        <GrNotes style={{ fontSize: '150px', color: 'red' }} />
        <div style={{ textAlign: 'left', marginLeft: '20px', color: '#333' }}>
          <div style={{ color: currentNote.color, fontSize: '50px' }}>
            {currentNote.icon}
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{currentNote.description}</h2>
          <p style={{ fontSize: '18px', display: 'flex', alignItems: 'center', color: '#006d5b' }}>
            Download Now <AiOutlineArrowRight style={{ marginLeft: '8px' }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Note;
