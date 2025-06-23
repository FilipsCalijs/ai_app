import React from "react";
import "./Review.css";

const reviews = [
  {
    title: "100,000+",
    subtitle: "users every day",
    emoji: "🧑‍🤝‍🧑",
  },
  {
    title: "User-friendly",
    subtitle: "and intuitive interface",
    emoji: "🤩",
  },
  {
    title: "Trustworthy",
    subtitle: "the best AI Undress website",
    emoji: "✔️",
  },
];

const Review = () => {
  return (
    <div className="review-container">
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
