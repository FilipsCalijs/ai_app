import React from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const AuthModal = ({ onClose }) => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      alert("Ошибка входа через Google");
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "400px",
        width: "90%",
        textAlign: "center",
      }}>
        <h2>Авторизация</h2>
        <p>Пожалуйста, войдите через Google, чтобы продолжить</p>
        <button
          onClick={handleGoogleLogin}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#4285F4",
            border: "none",
            borderRadius: "4px",
            color: "white",
            marginTop: "1rem",
          }}
        >
          Войти через Google
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
