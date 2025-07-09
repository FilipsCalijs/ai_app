import React, { useState, useEffect } from "react";
import { sendSignInLink, doSignInWithGoogle } from "../components/firebaseAuth"; // пути подкорректируй
import { auth } from "../components/firebase/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailFromStorage = window.localStorage.getItem("emailForSignIn");
      if (!emailFromStorage) {
        emailFromStorage = window.prompt("Пожалуйста, введите ваш email для подтверждения входа");
      }
      signInWithEmailLink(auth, emailFromStorage, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          navigate("/create-image");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [navigate]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await sendSignInLink(email);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("Ссылка для входа отправлена на вашу почту.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await doSignInWithGoogle();
      navigate("/create-image");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Вход или регистрация</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}

      <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <button
          type="submit"
          style={{
            padding: 10,
            fontSize: 16,
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Войти по ссылке из email
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleGoogleSignIn}
        style={{
          width: "100%",
          padding: 10,
          fontSize: 16,
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Войти через Google
      </button>
    </div>
  );
}