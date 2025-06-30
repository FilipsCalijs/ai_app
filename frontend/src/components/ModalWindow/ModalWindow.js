import React, { useState, useEffect } from 'react';
import './ModalWindow.css';

const slides = [
  {
    imgGood: '/images/good1.jpg',
    imgBad: '/images/bad1.jpg',
    text: 'There must not be any other people in the photo. The girl must be in the center. The photo should be in good quality.',
  },
  {
    imgGood: '/images/good2.jpg',
    imgBad: '/images/bad2.jpg',
    text: 'The background must be simple. Avoid distractions.',
  },
  {
    imgGood: '/images/good3.jpg',
    imgBad: '/images/bad3.jpg',
    text: 'Lighting must be natural. Avoid flash or low light.',
  },
];

export default function ModalWindow({ onClose }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    setStep(Math.max(0, step - 1));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="slide-images">
          <div className="slide-image-box">
            <img src={slides[step].imgGood} alt="Good" />
            <div className="label good">GOOD</div>
          </div>
          <div className="slide-image-box">
            <img src={slides[step].imgBad} alt="Bad" />
            <div className="label bad">BAD</div>
          </div>
        </div>

        <div className="slide-text">{slides[step].text}</div>

        <div className="progress-bar">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === step ? 'active' : ''}`}
            ></div>
          ))}
        </div>

        <div className="modal-buttons">
          <button className="back-button" onClick={handleBack} disabled={step === 0}>
            ← Back
          </button>
          <button className="next-button" onClick={handleNext}>
            {step === slides.length - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
