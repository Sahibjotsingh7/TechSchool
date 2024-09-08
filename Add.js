import React from 'react';
import { FaLaptopCode, FaServer, FaLanguage, FaDatabase, FaBook, FaCalculator } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Add = () => {
    const Explore = [
        {
            id: 1,
            logo: <FaLaptopCode style={{ fontSize: '40px', color: '#ff6347' }} />,
            title: 'Frontend',
            disc: '22+ courses ',
        },
        {
            id: 2,
            logo: <FaServer style={{ fontSize: '40px', color: '#4682b4' }} />,
            title: 'Backend',
            disc: '18+ courses ',
        },
        {
            id: 3,
            logo: <FaLanguage style={{ fontSize: '50px', color: '#32cd32' }} />,
            title: 'Languages',
            disc: '30+ courses ',
        },
        {
            id: 4,
            logo: <FaBook style={{ fontSize: '50px', color: '#ff1493' }} />,
            title: 'Fundamentals',
            disc: '25+ courses ',
        },
        {
            id: 5,
            logo: <FaDatabase style={{ fontSize: '50px', color: '#ffa500' }} />,
            title: 'Database',
            disc: '15+ courses ',
        },
        {
            id: 6,
            logo: <FaCalculator style={{ fontSize: '50px', color: '#8a2be2' }} />,
            title: 'Engineering Maths',
            disc: '12+ courses ',
        },
    ];

    return (
        <div style={{ background: 'linear-gradient(180deg, green, greenyellow)', color: 'white', paddingTop: '50px', width: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>Explore 200+ Free Online Tutorials</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '50px 200px' }}>
                {Explore.map(course => (
                    <div 
                        key={course.id} 
                        style={{ 
                            color: 'black', 
                            height: '150px', 
                            width: '220px', 
                            background: 'white', 
                            borderRadius: '20px', 
                            padding: '20px', 
                            textAlign: 'center',
                            transition: 'transform 0.3s ease-in-out',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                        className="course-div"
                    >
                        <div style={{ marginBottom: '10px' }}>
                            {course.logo}
                        </div>
                        <h2 style={{ margin: '10px 0' }}>{course.title}</h2>
                        <p style={{ margin: '0' }}>{course.disc} <AiOutlineArrowRight /></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Add;
