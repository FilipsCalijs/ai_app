// src/components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Undressor. All rights reserved.</p>
        <div className="footer-languages">
          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            English
          </span>
          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/ru")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            Русский
          </span>
          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/de")}
            style={{ cursor: "pointer" }}
          >
            Deutsch
          </span>
        </div>
      </div>
    </footer>
  );
}
