import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
  
        try {
          const response = await fetch("http://localhost:5001/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          });
  
          if (!response.ok) throw new Error("Server response not OK");
  
          const data = await response.json();
          setUserData(data);
          console.log("User data from backend:", data);
        } catch (err) {
          console.error("Fetch error:", err);
          setUserData(null);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
  
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  const value = {
    currentUser,
    userData,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
