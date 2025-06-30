import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext/AuthContext"; // путь подкорректируй

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return currentUser ? children : <Navigate to="/signup" replace />;
}
