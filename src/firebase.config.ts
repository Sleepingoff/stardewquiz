// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "stardewquiz.firebaseapp.com",
  projectId: "stardewquiz",
  storageBucket: "stardewquiz.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGEID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
