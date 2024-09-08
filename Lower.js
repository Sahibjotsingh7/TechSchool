import React from 'react';

const Lower = () => {
    return (
        <div className="lower">
            <header className="lower-header">
                <h1>Welcome to TechSchool</h1>
            </header>
            <main className="lower-main">
                {/* Privacy Policy Section */}
                <section className="section" id="privacy-policy">
                    <h1>Privacy Policy</h1>
                    <p>
                        At TechSchool, we take your privacy seriously. We are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>
                    <p>
                        We collect information that you provide to us directly, such as when you create an account, update your profile, or contact customer support. This may include your name, email address, payment information, and other personal details.
                    </p>
                    <p>
                        We also automatically collect certain information when you access our services, including your IP address, browser type, and usage data. This helps us understand how you use our platform and improve our services.
                    </p>
                    <p>
                        We will not share your personal information with third parties without your consent, except as necessary to provide our services or comply with the law. We use industry-standard security measures to protect your information from unauthorized access, use, or disclosure.
                    </p>
                </section>

                {/* Security Section */}
                <section className="section" id="security">
                    <h1>Security</h1>
                    <p>
                        Security is a top priority at TechSchool. We implement a variety of security measures to ensure the safety of your personal information. These measures include encryption, firewalls, and secure server infrastructure.
                    </p>
                    <p>
                        We regularly update our security protocols to protect against evolving threats. Our team continuously monitors our systems for any signs of suspicious activity and responds promptly to potential security incidents.
                    </p>
                    <p>
                        Users are encouraged to use strong passwords and keep their login information confidential. If you suspect any unauthorized access to your account, please contact our support team immediately.
                    </p>
                    <p>
                        While we strive to protect your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to doing our best to protect your data.
                    </p>
                </section>

                {/* Help Section */}
                <section className="section" id="help">
                    <h1>Help</h1>
                    <p>
                        Need assistance? Our support team at TechSchool is here to help you with any questions or issues you may have. Whether you're having trouble logging in, accessing your courses, or need information about billing, we're here to provide support.
                    </p>
                    <p>
                        Visit our Help Center for a comprehensive collection of articles, tutorials, and frequently asked questions. You can also reach out to us directly via email or through our support portal. Our team is dedicated to providing prompt and helpful responses.
                    </p>
                    <p>
                        For technical support, account management, or general inquiries, you can contact us at support@techschool.com. We aim to respond to all inquiries within 24 hours.
                    </p>
                    <p>
                        If you have feedback or suggestions on how we can improve our platform, we would love to hear from you. Your input helps us create a better experience for all users.
                    </p>
                </section>

                {/* More Section */}
                <section className="section" id="more">
                    <h1>More</h1>
                    <p>
                        TechSchool is constantly evolving. Stay updated with the latest features, courses, and improvements by following us on social media and subscribing to our newsletter. We regularly share updates, tips, and educational content that can help you make the most out of our platform.
                    </p>
                    <p>
                        We are committed to continuous learning and development. Our team is always exploring new ways to enhance the user experience and provide more value to our community. From new course offerings to enhanced user features, we strive to keep our platform dynamic and innovative.
                    </p>
                    <p>
                        Interested in becoming a part of our journey? We are always looking for passionate educators, developers, and innovators to join our team. Check out our Careers page for the latest job openings and opportunities to contribute to our mission.
                    </p>
                    <p>
                        Thank you for being a part of TechSchool. We are excited to have you on this learning journey with us. Stay tuned for more updates, and as always, happy learning!
                    </p>
                </section>
            </main>
            <footer className="lower-footer">
                <p>© 2024 TechSchool. All rights reserved.</p>
            </footer>
            <style jsx>{`
                .lower {
                    background-color: white;
                    color: black;
                    font-family: Arial, sans-serif;
                    padding: 100px 20px;
                }

                .lower-header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: green;
                    color: white;
                }

                .lower-main {
                    padding: 20px;
                }

                .section {
                    margin-bottom: 40px;
                }

                .section h1 {
                    font-size: 2rem;
                    margin-bottom: 15px;
                    color: green;
                }

                .section p {
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 15px;
                }

                .lower-footer {
                    text-align: center;
                    padding: 20px 0;
                    background-color: black;
                    color: white;
                    margin-top: 40px;
                }

                .lower-footer p {
                    margin: 0;
                }
            `}</style>
        </div>
    );
};

export default Lower;
