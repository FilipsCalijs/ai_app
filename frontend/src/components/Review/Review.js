import React, { useEffect, useRef } from "react";
import "./Review.css";
import { useTranslation } from "react-i18next";

const Review = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      title: t("review.users.title"),
      subtitle: t("review.users.subtitle"),
      emoji: "🧑‍🤝‍🧑"
    },
    {
      title: t("review.userFriendly.title"),
      subtitle: t("review.userFriendly.subtitle"),
      emoji: "📱"
    },
    {
      title: t("review.topQuality.title"),
      subtitle: t("review.topQuality.subtitle"),
      emoji: "✔️"
    },
    {
      title: t("review.secure.title"),
      subtitle: t("review.secure.subtitle"),
      emoji: "🔒"
    }
  ];

  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const requestRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = () => window.innerWidth <= 707;
    if (!isMobile()) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollSpeed = 0.5;

    const step = () => {
      scrollPositionRef.current += scrollSpeed;
      if (scrollPositionRef.current > maxScroll) {
        scrollPositionRef.current = 0;
      }
      container.scrollLeft = scrollPositionRef.current;
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);

    const handleResize = () => {
      if (!isMobile()) cancelAnimationFrame(requestRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="review-container" ref={containerRef}>
      {reviews.map((item, index) => (
        <div className="review-card" key={index}>
          <div className="review-emoji">{item.emoji}</div>
          <div className="review-text">
            <h3 className="review-title">{item.title}</h3>
            <p className="review-subtitle">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
