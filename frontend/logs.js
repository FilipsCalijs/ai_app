// log.js (фронт)
export async function sendLog(data) {
    try {
      const res = await fetch("http://localhost:5001/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("Лог отправлен:", result);
    } catch (err) {
      console.error("Ошибка отправки лога:", err);
    }
  }
  

  export async function sendLog(eventType, extra = {}) {
  try {
    const payload = {
      event_type: eventType,
      current_url: window.location.href, // текущий URL
      referer: document.referrer || null, // откуда пришёл пользователь
      browser: navigator.userAgent,      // для useragent на сервере
      os: navigator.platform,            // тоже для useragent
      ...extra                           // дополнительные данные: element_id, scroll_y, time_spent
    };

    await fetch("http://localhost:5001/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`${eventType} logged`, payload);
  } catch (err) {
    console.error("Error sending log:", err);
  }
}
