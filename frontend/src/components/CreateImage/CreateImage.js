import React from "react";
import { useAuth } from "../AuthContext/AuthContext";
import Footer from "../Footer/Footer";

import LogoutButton from "../LogoutButton/LogoutButton"; 
import "./CreateImage.css"; // подключаем стили

const CreateImage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="create-image-page">
      <h1>Create Image Page</h1>
      {currentUser ? (
        <>
          <p>Вы вошли как: <b>{currentUser.email}</b></p>
          <LogoutButton /> 
        </>
      ) : (
        <p>Пожалуйста, войдите, чтобы продолжить.</p>
      )}

      <p>Здесь будет функционал создания изображения.</p>

      <Footer />
    </div>
  );
};

export default CreateImage;
