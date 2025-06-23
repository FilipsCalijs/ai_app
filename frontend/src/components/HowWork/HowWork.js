import React from "react";
import "./HowWork.css";

const HowWork = () => {
  return (
    <section className="howwork-container">
      <div className="howwork-image">
        <img src="/example.png" alt="Preview" />
      </div>
      <div className="howwork-content">
        <h2>How does SmartAI Tool work?</h2>
        <p>
          Our AI-powered tool is trained on thousands of data samples. It
          generates results as accurately as possible, giving users intelligent
          and fast outputs.
        </p>
        <ol>
          <li><strong>Sign up safely and anonymously</strong></li>
          <li><strong>Choose a generation mode</strong></li>
          <li><strong>Upload your image or file to get results</strong></li>
        </ol>
        <button className="glow-button">Try for free</button>
      </div>
    </section>
  );
};

export default HowWork;
