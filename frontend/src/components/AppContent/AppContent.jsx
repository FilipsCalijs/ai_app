import React, { useEffect } from "react";
import { logVisit, trackClicks, trackScroll, logTime } from "../../log";

const AppContent = () => {
  useEffect(() => {
    logVisit();
    trackClicks();
    trackScroll();

    window.addEventListener("beforeunload", logTime);

    return () => {
      logTime();
      window.removeEventListener("beforeunload", logTime);
    };
  }, []);

  return (
    <div>
      {/* твой основной контент */}
    </div>
  );
};

export default AppContent;
