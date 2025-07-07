import { auth } from "../components/firebase/firebase"; // импорт auth один раз
import {
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const actionCodeSettings = {
  url: window.location.origin + "/signup", // или "/login"
  handleCodeInApp: true,
};

export const sendSignInLink = (email) => {
  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};