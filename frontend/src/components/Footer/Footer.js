import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      © {year} All rights reserved
    </footer>
  );
};

export default Footer;


// import React, { useEffect } from "react";
// import { useAuth } from "../AuthContext/AuthContext";
// import "./Footer.css";

// export default function Footer() {
//   const { userData, loading } = useAuth();

//   useEffect(() => {
//     if (!loading) {
//       console.log("✅ User Data в Footer:", userData);
//     }
//   }, [loading, userData]);

//   return (
//     <footer className="footer">
//       {loading ? (
//         <p>🔄 Загрузка данных...</p>
//       ) : !userData ? (
//         <p>⚠️ Пользователь не авторизован</p>
//       ) : (
//         <>
//           <p>📧 Email: {userData.email}</p>
//           <p>💰 Коины: {userData.coins ?? 0}</p>
//           <p>📦 Подписка: {userData.subscription ?? "Нет"}</p>
//         </>
//       )}
//     </footer>
//   );
// }
