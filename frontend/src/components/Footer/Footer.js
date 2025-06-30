import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="logo.png" alt="Logo" width={40} height={40} />
          <span>ClothOff</span>
        </div>
        <nav className="footer-nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-socials">
          <a href="https://telegram.org" aria-label="Telegram" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://support.example.com" aria-label="Support" target="_blank" rel="noopener noreferrer">Support</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 ClothOff. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;