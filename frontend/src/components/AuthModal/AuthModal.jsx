import React, { useEffect, useState } from "react";
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup, onAuthStateChanged, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const actionCodeSettings = {
  url: `${window.location.origin}/create-image`, // куда пользователь попадёт после ссылки
  handleCodeInApp: true,
};

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        onClose();
        navigate("/create-image");
      }
    });
    // Проверяем если пользователь пришёл по ссылке из email
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");
      if (!storedEmail) {
        storedEmail = window.prompt("Введите ваш email для входа:");
      }
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          setIsLoggedIn(true);
          onClose();
          navigate("/create-image");
        })
        .catch(console.error);
    }

    return () => unsubscribe();
  }, [navigate, onClose]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      onClose();
      navigate("/create-image");
    } catch (error) {
      alert("Ошибка входа через Google");
      console.error(error);
    }
  };

  const handleEmailLinkLogin = async () => {
    if (!email) return alert("Введите ваш email");
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setLinkSent(true);
    } catch (error) {
      console.error(error);
      alert("Ошибка отправки ссылки на email");
    }
  };

  if (isLoggedIn) return null;

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
        <p>Вы можете войти через Google или получить ссылку на Gmail</p>

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
            width: "100%",
          }}
        >
          Войти через Google
        </button>

        <hr style={{ margin: "20px 0" }} />

        {!linkSent ? (
          <>
            <input
              type="email"
              placeholder="Введите ваш Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "0.5rem",
                width: "100%",
                marginBottom: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={handleEmailLinkLogin}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
                backgroundColor: "#34A853",
                border: "none",
                borderRadius: "4px",
                color: "white",
                width: "100%"
              }}
            >
              Отправить ссылку на Gmail
            </button>
          </>
        ) : (
          <p>Ссылка для входа отправлена на ваш email! Проверьте почту.</p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
