import React from 'react';
import { FaUserFriends, FaEnvelope, FaGlobe, FaRocket } from 'react-icons/fa'; // Importing icons


const About = () => {
    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <section style={styles.section}>
                    <div style={styles.iconHeadingWrapper}>
                        <FaRocket style={{ ...styles.icon, color: '#808080' }} /> {/* Gray color for rocket */}
                        <h2 style={styles.heading}>Our Mission</h2>
                    </div>
                    <p style={styles.paragraph}>
                        At TechSchool, our mission is to provide high-quality education in Computer Science and related fields. We aim to empower students with the skills and knowledge they need to succeed in their careers.
                    </p>
                    <p style={styles.paragraph}>
                        We offer expert notes available for free download to enhance your learning experience. Our notes are crafted by industry professionals and are designed to support your studies effectively.
                    </p>
                </section>

                {/* Section: Our Vision */}
                <section style={styles.section}>
                    <div style={styles.iconHeadingWrapper}>
                        <FaGlobe style={{ ...styles.icon, color: '#1E90FF' }} />
                        <h2 style={styles.heading}>Our Vision</h2>
                    </div>
                    <p style={styles.paragraph}>
                        We envision a world where technology education is accessible to everyone. Our goal is to be a leading platform for learning, offering innovative and effective solutions for learners across the globe.
                    </p>
                    <p style={styles.paragraph}>
                        In the future, we will provide comprehensive documentation for each subject to further support your educational journey. Stay tuned for detailed guides and resources.
                    </p>
                </section>

                {/* Section: Meet the Team */}
                <section style={styles.section}>
                    <div style={styles.iconHeadingWrapper}>
                        <FaUserFriends style={{ ...styles.icon, color: '#FF8C00' }} /> {/* Orange color for user friends */}
                        <h2 style={styles.heading}>Meet the Team</h2>
                    </div>
                    <p style={styles.paragraph}>
                        Our team is composed of experienced educators, industry professionals, and passionate individuals committed to enhancing the learning experience. Together, we strive to create engaging and impactful educational content.
                    </p>
                </section>

                {/* Section: Contact Us */}
                <section style={styles.section}>
                    <div style={styles.iconHeadingWrapper}>
                        <FaEnvelope style={{ ...styles.icon, color: '#FF4500' }} /> {/* Red color for envelope */}
                        <h2 style={styles.heading}>Contact Us</h2>
                    </div>
                    <p style={styles.paragraph}>
                        Have questions or feedback? Reach out to us at <a href="mailto:info@techschool.com" style={styles.link}>info@techschool.com</a>. We're here to assist you and provide support for any inquiries you may have.
                    </p>
                </section>
            </main>
        </div>
    );
};

// Inline CSS styles with enhancements
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        backgroundColor: '#f4f4f4',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        marginTop:"100px",
    },
    header: {
        marginTop:"50px"
    },
    title: {
        fontSize: '2.5rem',
        margin: 0,
    },
    main: {
        padding: '20px',
        marginTop: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    section: {
        marginBottom: '40px',
        marginTop:'100px'
    },
    iconHeadingWrapper: {
        display: 'flex',
        alignItems: 'center', // Aligns icon and heading vertically in the center
        gap: '15px', // Gap between the icon and heading
    },
    icon: {
        fontSize: '3rem',
    },
    heading: {
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '20px',
        borderBottom: '3px solid #4CAF50',
        display: 'inline-block',
        paddingBottom: '5px',
    },
    paragraph: {
        lineHeight: '1.8',
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '15px',
    },
    link: {
        color: '#4CAF50',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default About;
