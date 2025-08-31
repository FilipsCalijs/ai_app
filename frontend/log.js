// src/log.js
import axios from "axios";

// Базовый URL сервера
const API_URL = "http://localhost:5001/api/log";

// helper для отправки данных
const sendLog = async (data) => {
  try {
    await axios.post(API_URL, data);
    console.log("✅ Лог отправлен:", data.event_type);
  } catch (err) {
    console.error("❌ Ошибка отправки лога:", err);
  }
};

// -------------------
// 1️⃣ Лог визита
// -------------------
export const logVisit = (current_url = window.location.href) => {
  const data = {
    browser: navigator.userAgent,
    os: navigator.platform,
    device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    referer: document.referrer || null,
    utm_source: new URLSearchParams(window.location.search).get("utm_source") || null,
    utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || null,
    utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || null,
    current_url,
    event_type: "visit",
    element_tag: null,
    element_id: null,
    scroll_y: null,
    time_spent: null
  };
  sendLog(data);
};

// -------------------
// 2️⃣ Лог кликов
// -------------------
export const trackClicks = () => {
  document.addEventListener("click", (e) => {
    const data = {
      browser: navigator.userAgent,
      os: navigator.platform,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      referer: document.referrer || null,
      utm_source: new URLSearchParams(window.location.search).get("utm_source") || null,
      utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || null,
      utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || null,
      current_url: window.location.href,
      event_type: "click",
      element_tag: e.target.tagName,
      element_id: e.target.id || null,
      scroll_y: window.scrollY,
      time_spent: null
    };
    sendLog(data);
  });
};

// -------------------
// 3️⃣ Лог скролла
// -------------------
export const trackScroll = () => {
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScroll) > 50) { // минимальный порог, чтобы не спамить
      lastScroll = scrollY;
      const data = {
        browser: navigator.userAgent,
        os: navigator.platform,
        device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        referer: document.referrer || null,
        utm_source: new URLSearchParams(window.location.search).get("utm_source") || null,
        utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || null,
        utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || null,
        current_url: window.location.href,
        event_type: "scroll",
        element_tag: null,
        element_id: null,
        scroll_y: scrollY,
        time_spent: null
      };
      sendLog(data);
    }
  });
};

// -------------------
// 4️⃣ Лог времени на странице
// -------------------
let startTime = Date.now();
export const logTime = () => {
  const endTime = Date.now();
  const seconds = ((endTime - startTime) / 1000).toFixed(2);

  const data = {
    browser: navigator.userAgent,
    os: navigator.platform,
    device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    referer: document.referrer || null,
    utm_source: new URLSearchParams(window.location.search).get("utm_source") || null,
    utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || null,
    utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || null,
    current_url: window.location.href,
    event_type: "time",
    element_tag: null,
    element_id: null,
    scroll_y: window.scrollY,
    time_spent: parseFloat(seconds)
  };
  sendLog(data);
};

// -------------------
// 5️⃣ Лог перехода между страницами (React Router)
// -------------------
export const trackPageView = (path) => {
  const data = {
    browser: navigator.userAgent,
    os: navigator.platform,
    device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    referer: document.referrer || null,
    utm_source: new URLSearchParams(window.location.search).get("utm_source") || null,
    utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || null,
    utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || null,
    current_url: path,
    event_type: "pageview",
    element_tag: null,
    element_id: null,
    scroll_y: window.scrollY,
    time_spent: null
  };
  sendLog(data);
};
