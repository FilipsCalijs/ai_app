// src/components/Footer/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t("footer.allRights")}</p>

        <div className="footer-languages">
          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            English
          </span>

          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/ru")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            Русский
          </span>

          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/de")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            Deutsch
          </span>

          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/hi")}
            style={{ cursor: "pointer" }}
          >
            हिंदी
          </span>
        </div>
      </div>
    </footer>
  );
}
