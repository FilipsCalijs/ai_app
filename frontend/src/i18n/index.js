import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";
import de from "./de.json";
import hi from "./hi.json";
import es from "./es.json";
import ja from "./ja.json";
import id from "./id.json"; 
import br from "./br.json"; 
import ph from "./ph.json"; 
import kr from "./kr.json"; 
import lv from "./lv.json"; 

let lang = "en"; // default

if (window.location.pathname.startsWith("/ru")) lang = "ru";
else if (window.location.pathname.startsWith("/de")) lang = "de";
else if (window.location.pathname.startsWith("/hi")) lang = "hi";
else if (window.location.pathname.startsWith("/es")) lang = "es";
else if (window.location.pathname.startsWith("/ja")) lang = "ja";
else if (window.location.pathname.startsWith("/id")) lang = "id";
else if (window.location.pathname.startsWith("/br")) lang = "br";
else if (window.location.pathname.startsWith("/kr")) lang = "kr";
else if (window.location.pathname.startsWith("/ph")) lang = "ph";
else if (window.location.pathname.startsWith("/lv")) lang = "lv";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    de: { translation: de },
    hi: { translation: hi },
    es: { translation: es },
    ja: { translation: ja },
    id: { translation: id },
    br: { translation: br },
    kr: { translation: kr },
    ph: { translation: ph },
    lv: { translation: lv },
  },
  lng: lang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  keySeparator: ".",
});

export default i18n;
