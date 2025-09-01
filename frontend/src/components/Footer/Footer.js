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
            onClick={() => (window.location.href = "/es")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            Español
          </span>
          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/lv")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            Latviešu
          </span>
          
          <span
            className="footer-lang"
            onClick={() => (window.location.href = "/br")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            Português
          </span>
          <span
          className="footer-lang"
          onClick={() => (window.location.href = "/id")}
          style={{ cursor: "pointer", marginRight: "8px" }}
        >
          Bahasa Indonesia
        </span>

        <span
          className="footer-lang"
          onClick={() => (window.location.href = "/ph")}
          style={{ cursor: "pointer" }}
        >
          Filipino
        </span>
        
        <span
            className="footer-lang"
            onClick={() => (window.location.href = "/kr")}
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            한국어
          </span>
        <span
          className="footer-lang"
          onClick={() => (window.location.href = "/ja")}
          style={{ cursor: "pointer", marginRight: "8px" }}
        >
          日本語
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
