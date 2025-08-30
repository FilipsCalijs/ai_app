import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";
import de from "./de.json";

let lang = "en"; // default

if (window.location.pathname.startsWith("/ru")) lang = "ru";
else if (window.location.pathname.startsWith("/de")) lang = "de";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    de: { translation: de },
  },
  lng: lang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  keySeparator: ".",
});

export default i18n;
