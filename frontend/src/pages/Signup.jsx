import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../components/firebaseAuth"; // путь подкорректируй
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/create-image");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await doSignInWithGoogle();
      navigate("/create-image");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Регистрация</h2>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Зарегистрироваться
        </button>
      </form>
      <hr style={{ margin: "20px 0" }} />
      <button
        onClick={handleGoogleSignUp}
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
        Зарегистрироваться через Google
      </button>
    </div>
  );
}