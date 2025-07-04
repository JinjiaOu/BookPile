import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="company-info">
                <h4>Company</h4>
                <ul>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Accessibility Statement</a></li>
                    <li><a href="#">Directions</a></li>
                </ul>
            </div>
            <div className="social-links">
                <h4>Follow</h4>
                <ul>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">YouTube</a></li>
                </ul>
            </div>
            <div className="copyright-info">
                <p>&copy; 2024 Book Pile. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
