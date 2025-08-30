// src/components/NotFound/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-message">Page Not Found</h2>
      <button className="glow-button" onClick={() => navigate("/")}>
        Return to Homepage
      </button>
    </div>
  );
};

export default NotFound;
