import React from "react";
import "./FrontHero.css";

const FrontHeroHeader = () => {
  return (
    <div className="front-hero__header">
      <div className="front-hero__logo">
        <img
          src="logo.png"
          alt="Logo"
          width={50}
          height={50}
        /> 
        logo
      </div>
      <div className="front-hero__header-buttons">
        <button className="header-button telegram">Telegram</button>
        <button className="header-button support">Support</button>
      </div>
    </div>
  );
};

const FrontHero = () => {
  return (
    <section className="front-hero">
      <FrontHeroHeader />

      <div className="front-hero__content">
        <div className="front-hero__text">
        <h2 className="FrontHero-Title">
        Undress <span style={{ color: '#FF8800' }}>Photo & Video</span> online for Free
        </h2>
          <p className="FrontHero-Text">
            With ClothOff, undressing photos has never been easier. Upload your
            image, customize settings, and let our nudify AI deliver stunning
            undressed results in seconds.
          </p>
          <button className="glow-button">Try for free</button>
        </div>
        <div className="front-hero__media">
          <img
            className="front-hero__image"
            src="/preview-photo/undress.png"
            alt="Undress AI preview"
            width={200}
            height={200}
          />
          <video
            className="front-hero__video"
            src="/preview-photo/undress.mp4"
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload"
            aria-label="Undress AI video"
            width={200}
            height={200}
          />
        </div>
      </div>

    </section>
  );
};

export default FrontHero;