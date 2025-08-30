// src/components/HowWork/HowWork.js
import React from "react";
import "./HowWork.css";
import "../../App.css";
import { useTranslation } from "react-i18next";

const HowWork = () => {
  const { t } = useTranslation();

  return (
    <section className="howwork-container">
      <div className="howwork-image">
        <img
          src="/preview-photo/bg.png"
          alt={t("howWork.bgAlt")}
          className="howwork-image-bg"
        />
        <img
          src="/preview-photo/preview2.jpg"
          alt={t("howWork.previewAlt")}
          className="howwork-image-main"
        />
      </div>

      <div className="howwork-content">
        <h2>{t("howWork.title")}</h2>
        <p>{t("howWork.description")}</p>
        <ol>
          <li><strong>{t("howWork.step1")}</strong></li>
          <li><strong>{t("howWork.step2")}</strong></li>
          <li><strong>{t("howWork.step3")}</strong></li>
        </ol>
      </div>
    </section>
  );
};

export default HowWork;
