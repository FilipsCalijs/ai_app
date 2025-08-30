import React from "react";
import "./SecuritySafe.css";
import "../../App.css";
import { useTranslation } from "react-i18next";

const SecuritySafe = () => {
  const { t } = useTranslation();

  return (
    <section className="security-safe">
      <div className="security-content">

        {/* Текст перемещён выше */}
        <div className="security-text">
          <h1>
            {t("securitySafe.titlePart1")} <span>{t("securitySafe.titlePart2")}</span>
          </h1>
          <p className="text-simple">
            {t("securitySafe.description")}
          </p>
          <a
            className="glow-button"
            href="https://t.me/TestBeta123bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("securitySafe.tryFree")}
          </a>
        </div>

        {/* Картинка теперь справа */}
        <img
          src="/security.png"
          alt={t("securitySafe.imageAlt")}
          className="security-image"
        />

      </div>
    </section>
  );
};

export default SecuritySafe;
