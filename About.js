import React from 'react';
import Footer from './Footer';

const About = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>About TechSchool</h1>
            </header>
            <main style={styles.main}>
               
                <section style={styles.section}>
                    <h2 style={styles.heading}>Our Mission</h2>
                    <p style={styles.paragraph}>
                        At TechSchool, our mission is to provide high-quality education in Computer Science and related fields. We aim to empower students with the skills and knowledge they need to succeed in their careers.
                    </p>
                    <p style={styles.paragraph}>
                        We offer expert notes available for free download to enhance your learning experience. Our notes are crafted by industry professionals and are designed to support your studies effectively.
                    </p>
                </section>

              
                <section style={styles.section}>
                    <h2 style={styles.heading}>Our Vision</h2>
                    <p style={styles.paragraph}>
                        We envision a world where technology education is accessible to everyone. Our goal is to be a leading platform for learning, offering innovative and effective solutions for learners across the globe.
                    </p>
                    <p style={styles.paragraph}>
                        In the future, we will provide comprehensive documentation for each subject to further support your educational journey. Stay tuned for detailed guides and resources.
                    </p>
                </section>

            
                <section style={styles.section}>
                    <h2 style={styles.heading}>Meet the Team</h2>
                    <p style={styles.paragraph}>
                        Our team is composed of experienced educators, industry professionals, and passionate individuals committed to enhancing the learning experience. Together, we strive to create engaging and impactful educational content.
                    </p>
                </section>

               
                <section style={styles.section}>
                    <h2 style={styles.heading}>Contact Us</h2>
                    <p style={styles.paragraph}>
                        Have questions or feedback? Reach out to us at <a href="mailto:info@techschool.com" style={styles.link}>info@techschool.com</a>. We're here to assist you and provide support for any inquiries you may have.
                    </p>
                </section>
            </main>
           <Footer></Footer>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#000',
        backgroundColor: '#fff',
        paddingTop: '50px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        backgroundColor: '#4CAF50', // Green background
        color: '#fff',
        padding: '20px',
    },
    main: {
        padding: '20px',
    },
    section: {
        marginBottom: '30px',
    },
    heading: {
        borderBottom: '2px solid #4CAF50', // Green border
        paddingBottom: '10px',
        marginBottom: '10px',
    },
    paragraph: {
        lineHeight: '1.6',
    },
    link: {
        color: '#4CAF50', // Green color for links
        textDecoration: 'underline',
    },
    footer: {
        textAlign: 'center',
        backgroundColor: '#4CAF50', // Green background
        color: '#fff',
        padding: '10px',
        position: 'fixed',
        width: '100%',
        bottom: '0',
    }
};

export default About;
