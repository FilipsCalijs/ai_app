import React from "react";
import "./RulesModal.css";

const RulesModal = ({ onAccept }) => {
  return (
    <div className="rules-modal__overlay">
      <div className="rules-modal__content">
        <h2>Rules</h2>
        <ol>
          <li>You must be 18+ to use this website.</li>
          <li>You can't use others photos without their permission and persons under 18 years of age.</li>
          <li>You are solely responsible for the images you generate.</li>
        </ol>
        <p>By clicking on Accept you automatically agree to the above terms</p>
        <button className="rules-modal__button" onClick={onAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default RulesModal;
