import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";
import de from "./de.json";
import hi from "./hi.json";
import es from "./es.json";
import ja from "./ja.json";
//import hi from "./id.json"; индонезия
//import hi from "./br.json"; бразилия
//import hi from "./id.json"; индонезия
//import hi from "./kr.json"; корея
//import hi from "./ph.json"; филипины

let lang = "en"; // default

if (window.location.pathname.startsWith("/ru")) lang = "ru";
else if (window.location.pathname.startsWith("/de")) lang = "de";
else if (window.location.pathname.startsWith("/hi")) lang = "hi";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    de: { translation: de },
    hi: { translation: hi },
  },
  lng: lang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  keySeparator: ".",
});

export default i18n;
