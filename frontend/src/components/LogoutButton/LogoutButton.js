import React from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // выход из аккаунта
      navigate("/"); // редирект на главную
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "0.5rem 1rem",
        cursor: "pointer",
        margin: "1rem 0",
      }}
    >
      Выйти
    </button>
  );
};

export default LogoutButton;
