import React, { useEffect, useRef } from "react";
import "./Review.css";

const reviews = [
  { title: "5,000+ users", subtitle: "every day visiting our site", emoji: "🧑‍🤝‍🧑" },
  { title: "User-friendly", subtitle: "and intuitive interface", emoji: "📱" },
  { title: "Top Quality", subtitle: "Best quality on the market", emoji: "✔️" },
  { title: "Secure", subtitle: "Your data is safe with us", emoji: "🔒" }
];

const Review = () => {
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const requestRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = () => window.innerWidth <= 707;
    if (!isMobile()) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollSpeed = 0.5; // пикселей за кадр, регулируй по вкусу

    const step = () => {
      scrollPositionRef.current += scrollSpeed;
      if (scrollPositionRef.current > maxScroll) {
        scrollPositionRef.current = 0;
      }
      container.scrollLeft = scrollPositionRef.current;
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);

    // Остановить анимацию при выходе из мобилки
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
