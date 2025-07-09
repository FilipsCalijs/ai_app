import React from "react";
import "./FrontHero.css";
import { useNavigate } from 'react-router-dom';

const FrontHeroHeader = () => {
  return (
    <div className="front-hero__header">
      <div className="front-hero__logo">
        <img
          src="logo-removebg-preview.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <div><span style={{ color: '#FF8800' }}>Un</span>dressor</div>
      </div>

      <div className="front-hero__header-buttons">
        <a className="header-button telegram" href="https://t.me/TestBeta123bot" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
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
            Most Powerful <span style={{ color: '#FF8800' }}> AI Clothes </span>Remover Tool
          </h2>
          <p className="FrontHero-Text">
            Undressor uses the most advanced AI technologies to make your photos look as realistic as possible. Upload your image, customize the settings, and create your perfect look!
          </p>
          <a
            className="glow-button"
            href="https://t.me/TestBeta123bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try for free
          </a>
        </div>
        <div className="front-hero__media">
          <img
            className="front-hero__image"
            src="/preview-photo/preivew.jpg"
            alt="Undress AI preview"
            width={200}
            height={200}
          />
         
        </div>
      </div>
    </section>
  );
};

export default FrontHero;
