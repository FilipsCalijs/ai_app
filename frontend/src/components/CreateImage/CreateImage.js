import React from "react";
import { useAuth } from "../AuthContext/AuthContext";

const CreateImage = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1>Create Image Page</h1>
      {currentUser ? (
        <p>Вы вошли как: <b>{currentUser.email}</b></p>
      ) : (
        <p>Пожалуйста, войдите, чтобы продолжить.</p>
      )}
      <p>Здесь будет функционал создания изображения.</p>
    </div>
  );
};

export default CreateImage;