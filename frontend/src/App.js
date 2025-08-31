// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Компоненты
import TopBanner from "./components/TopBanner/TopBanner";
import FrontHero from "./components/FrontHero/FrontHero";
import Review from "./components/Review/Review";
import SliderCompare from "./components/SliderCompare/SliderCompare";
import HowWork from "./components/HowWork/HowWork";
import SecuritySafe from "./components/SecuritySafe/SecuritySafe";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import RulesModal from "./components/RulesModal/RulesModal";
import NotFound from "./components/NotFound/NotFound";

// Логирование
import { logVisit, trackClicks, trackScroll, logTime, trackPageView } from "./log";

// Список поддерживаемых языков
const supportedLanguages = ["ru", "de", "es", "hi", "ja", "lv"]; // en — по умолчанию

// Универсальная обертка для языковой версии
function LanguageWrapper({ lang }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <TopBanner />
      <FrontHero />
      <Review />
      <SliderCompare />
      <HowWork />
      <SecuritySafe />
      <FAQ />
      <Footer />
    </>
  );
}

// Основной контент приложения
function AppContent() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);

  // -----------------------
  // Логирование
  // -----------------------
  useEffect(() => {
    logVisit();                      // визит на сайт
    trackClicks();                   // клики
    trackScroll();                   // скролл
    trackPageView(location.pathname); // текущая страница

    window.addEventListener("beforeunload", logTime); // время на странице
    return () => {
      logTime();
      window.removeEventListener("beforeunload", logTime);
    };
  }, [location.pathname]);

  // -----------------------
  // Синхронизация языка с URL
  // -----------------------
  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    if (supportedLanguages.includes(pathLang)) {
      if (i18n.language !== pathLang) i18n.changeLanguage(pathLang);
    } else if (i18n.language !== "en") {
      i18n.changeLanguage("en");
    }
  }, [location.pathname, i18n]);

  // -----------------------
  // Проверка принятия правил
  // -----------------------
  useEffect(() => {
    const accepted = localStorage.getItem("rulesAccepted");
    if (accepted === "true") setRulesAccepted(true);
  }, []);

  const handleAcceptRules = () => {
    localStorage.setItem("rulesAccepted", "true");
    setRulesAccepted(true);
  };

  // -----------------------
  // Модальное окно на /create-image
  // -----------------------
  useEffect(() => {
    let timer;
    if (location.pathname === "/create-image") {
      timer = setTimeout(() => setShowModal(true), 5000);
    } else {
      setShowModal(false);
    }
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className={rulesAccepted ? "" : "app-blur"}>
        {showModal && <ModalWindow onClose={() => setShowModal(false)} />}

        <Routes>
          {/* Английская версия по умолчанию */}
          <Route
            path="/"
            element={
              <>
                <TopBanner />
                <FrontHero />
                <Review />
                <SliderCompare />
                <HowWork />
                <SecuritySafe />
                <FAQ />
                <Footer />
              </>
            }
          />

          {/* Языковые версии */}
          {supportedLanguages.map((lang) => (
            <Route key={lang} path={`/${lang}/*`} element={<LanguageWrapper lang={lang} />} />
          ))}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!rulesAccepted && <RulesModal onAccept={handleAcceptRules} />}
    </>
  );
}

// Главный App с Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
