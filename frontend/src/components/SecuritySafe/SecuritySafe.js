import React from "react";
import "./SecuritySafe.css";
import "../../App.css";

const SecuritySafe = () => {
  return (
    <section className="security-safe">
      <div className="security-content">

        {/* Текст перемещён выше */}
        <div className="security-text">
          <h1>
          Your data stays 
            <span> private  </span> 
            
          </h1>
          <p className="text-simple">
            We do not use your images. <br />
            Your images are saved safely just for you. We don’t use them for anything else and never show them to others.
          </p>
          <a class="glow-button" href="https://t.me/TestBeta123bot" target="_blank" rel="noopener noreferrer">Try for free</a>

        </div>

        {/* Картинка теперь справа */}
        <img src="/security.png" alt="Security Lock" className="security-image" />

      </div>
    </section>
  );
};

export default SecuritySafe;
