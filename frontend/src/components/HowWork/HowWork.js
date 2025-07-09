import React from "react";
import "./HowWork.css";
import "../../App.css";

const HowWork = () => {
  return (
    <section className="howwork-container">
      <div className="howwork-image">
  <img
    src="/preview-photo/bg.png"
    alt="Background shape"
    className="howwork-image-bg"
  />
  <img
    src="/preview-photo/preview2.jpg"
    alt="Preview"
    className="howwork-image-main"
  />
</div>


      <div className="howwork-content">
        <h2>How does Undressor work</h2>
        <p className="">
        Undressor is powered by big LLM modal that has learned from thousands of images. It understands shapes, clothing, and body features to generate accurate and natural-looking results in seconds.
        </p>
        <ol>
          <li><strong>You don’t need an account to use it</strong></li>
          <li><strong>Just pick a mode that fits your needs</strong></li>
          <li><strong>Upload your image and get the result right away</strong></li>
        </ol>
     

      </div>
    </section>
  );
};

export default HowWork;
