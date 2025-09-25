// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKNc1vs8Ys7TKvOC08PoeaivYFgfFNBIg",
  authDomain: "girls-ai-a80cf.firebaseapp.com",
  projectId: "girls-ai-a80cf",
  storageBucket: "girls-ai-a80cf.firebasestorage.app",
  messagingSenderId: "492614921687",
  appId: "1:492614921687:web:d47bd899f5c5deba846f92",
  measurementId: "G-EMDQMR38LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Создаём и экспортируем провайдера Google
const provider = new GoogleAuthProvider();

export { app, auth, provider };
