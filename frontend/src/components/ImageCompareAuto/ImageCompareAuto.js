// ImageCompareAuto.jsx
import React, { useEffect, useRef, useState } from 'react';
import './ImageCompareAuto.css';

const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const ImageCompareAuto = ({ beforeSrc, afterSrc }) => {
  const [position, setPosition] = useState(0.2);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const duration = 10000;

  const min = 0.2;
  const max = 0.9;

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    const loopProgress = (elapsed % duration) / duration;
    const directionProgress = loopProgress < 0.5 ? loopProgress * 2 : (1 - loopProgress) * 2;
    const eased = easeInOut(directionProgress);
    const currentPosition = min + (max - min) * eased;

    setPosition(currentPosition);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const clipTopPercent = position * 100;

  return (
    <div className="compare-wrapper full">
      <img
        src={beforeSrc}
        alt="Before"
        className="img-base"
        style={{
          clipPath: `inset(${clipTopPercent}% 0 0 0)`,
          WebkitClipPath: `inset(${clipTopPercent}% 0 0 0)`,
        }}
      />
      <img
        src={afterSrc}
        alt="After"
        className="img-before"
        style={{
          clipPath: `inset(0 0 ${100 - clipTopPercent}% 0)`,
          WebkitClipPath: `inset(0 0 ${100 - clipTopPercent}% 0)`,
        }}
      />
      <div className="slider-bar vertical-line" style={{ top: `${clipTopPercent}%` }} />
    </div>
  );
};

export default ImageCompareAuto;