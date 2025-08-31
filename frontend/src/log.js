// src/log.js
import { detect } from "detect-browser";

let startTime = Date.now();
let lastScroll = 0;

// Функция для получения UTM-параметров
function getUTM() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
}

// Собираем базовый payload
function getBasePayload(eventType = "visit", element = null) {
  const browserInfo = detect();
  const { utm_source, utm_medium, utm_campaign } = getUTM();

  return {
    browser: browserInfo ? browserInfo.name + " " + browserInfo.version : "unknown",
    os: navigator.platform || "unknown",
    device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    referer: document.referrer || "",
    utm_source,
    utm_medium,
    utm_campaign,
    current_url: window.location.href,
    event_type: eventType,
    element_tag: element ? element.tagName : null,
    element_id: element ? element.id : null,
    scroll_y: window.scrollY || 0,
    time_spent: Math.floor((Date.now() - startTime) / 1000), // в секундах
  };
}

// Отправка на сервер
function sendLog(payload) {
  fetch("http://localhost:5001/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(console.error);
}

// Лог визита при заходе на страницу
export function logVisit() {
  sendLog(getBasePayload("visit"));
}

// Логирование времени на странице
export function logTime() {
  sendLog(getBasePayload("time_spent"));
}

// Логирование кликов по элементам
export function trackClicks() {
  document.addEventListener("click", (e) => {
    const element = e.target;
    sendLog(getBasePayload("click", element));
  });
}

// Логирование скролла
export function trackScroll() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScroll) > 50) { // логируем каждые 50px
      lastScroll = scrollY;
      sendLog(getBasePayload("scroll"));
    }
  });
}

// Логирование смены страницы / просмотра
export function trackPageView(path) {
  sendLog(getBasePayload("page_view"));
}
