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
            It's
            <span> completely </span> 
            safe
          </h1>
          <p className="text-simple">
            We don’t save any data. <br />
            This is completely confidential and your actions are not published anywhere.
          </p>
          <a class="glow-button" href="https://t.me/TestBeta123bot" target="_blank" rel="noopener noreferrer">Try for free</a>

        </div>

        {/* Картинка теперь справа */}
        <img src="/security.webp" alt="Security Lock" className="security-image" />

      </div>
    </section>
  );
};

export default SecuritySafe;
