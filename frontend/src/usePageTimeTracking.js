// src/usePageTimeTracking.js
import { useEffect, useRef } from "react";

export default function usePageTimeTracking() {
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now(); // фиксируем момент входа

    // Функция логирования выхода
    const logExit = () => {
      if (!startTimeRef.current) return;

      const endTime = Date.now();
      const timeSpentSec = Math.round((endTime - startTimeRef.current) / 1000);

      const payload = {
        browser: navigator.userAgent,
        os: navigator.platform, // можно заменить на navigator.userAgentData.platform, если доступно
        device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        referer: document.referrer,
        current_url: window.location.href,
        time_spent: timeSpentSec,
      };

      // sendBeacon гарантирует отправку при закрытии вкладки
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("http://localhost:5001/api/log", blob);
    };

    window.addEventListener("beforeunload", logExit);

    return () => {
      logExit(); // на случай размонтирования компонента
      window.removeEventListener("beforeunload", logExit);
    };
  }, []);
}
