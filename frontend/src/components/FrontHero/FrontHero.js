import React from "react";
import "./FrontHero.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import metaData from "../../metaData/metaData";

const FrontHeroHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="front-hero__header">
      <div className="front-hero__logo">
        <img
          src="/preview-photo/logo-removebg-preview.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <div>
          <span style={{ color: "#FF8800" }}>Un</span>dressor
        </div>
      </div>

      <div className="front-hero__header-buttons">
        <a
          className="header-button telegram"
          href="https://t.me/TestBeta123bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("telegram")}
        </a>

        <a
          className="header-button whatsapp"
          href="https://wa.me/37100000000"
          target="_blank"
          rel="noopener noreferrer"
        >
           {t("whatsapp")}
        </a>
      </div>
    </div>
  );
};

const FrontHero = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <section className="front-hero">
      <Helmet>
        <html lang={lang} />
        <title>{metaData[lang].title}</title>
        <meta name="description" content={metaData[lang].description} />

        <link rel="alternate" href="https://undressor.com/ru/" hreflang="ru" />
        <link rel="alternate" href="https://undressor.com/en/" hreflang="en" />
        <link rel="alternate" href="https://undressor.com/lv/" hreflang="lv" />
        <link rel="alternate" href="https://undressor.com/hu/" hreflang="hu" />
        <link rel="alternate" href="https://undressor.com/" hreflang="x-default" />
      </Helmet>

      <FrontHeroHeader />

      <div className="front-hero__content">
        <div className="front-hero__text">
          <h2
            className="FrontHero-Title"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <p className="FrontHero-Text">{t("description")}</p>

          <a
            className="glow-button"
            href="https://t.me/TestBeta123bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("tryFree")}
          </a>
        </div>
        <div className="front-hero__media">
          <img
            className="front-hero__image"
            src="/preview-photo/preivew.jpg"
            alt={t("title")}
            width={200}
            height={200}
          />
        </div>
      </div>
    </section>
  );
};

export default FrontHero;
