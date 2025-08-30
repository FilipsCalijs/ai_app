import React from "react";
import "./RulesModal.css";

const RulesModal = ({ onAccept }) => {
  return (
    <div className="rules-modal__overlay">
      <div className="rules-modal__content">
        <h2>Rules & Terms of Use</h2>
        <ol>
          <li>You must be 18+ to use this website.</li>
          <li>You cannot use or upload images of people under 18 years old.</li>
          <li>You cannot use other people’s photos without their permission.</li>
          <li>All content you generate must comply with local and international laws.</li>
          <li>The website and its owners are not liable for any misuse of generated images.</li>
          <li>You must not generate or distribute illegal, obscene, or offensive content.</li>
         
        </ol>
        <p>
          By clicking on <strong>Accept</strong>, you automatically agree to all of the above terms and conditions.
        </p>
        <button className="rules-modal__button" onClick={onAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default RulesModal;
