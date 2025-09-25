// log.js
export async function sendLog(eventType, extra = {}) {
  try {
    const payload = {
      event_type: eventType,
      current_url: window.location.href,
      referer: document.referrer || null,
      browser: navigator.userAgent,
      os: navigator.platform,
      ...extra
    };

    // ✅ Используем относительный путь вместо localhost
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(`${eventType} logged`, payload);
  } catch (err) {
    console.error("Error sending log:", err);
  }
}
