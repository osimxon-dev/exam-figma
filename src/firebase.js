// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5kVLtDpuoHEnd81bVu1kfkqKBkJ7X4Xk",
  authDomain: "exam-609a6.firebaseapp.com",
  projectId: "exam-609a6",
  storageBucket: "exam-609a6.firebasestorage.app",
  messagingSenderId: "588702897788",
  appId: "1:588702897788:web:7f263bf663647849265bf9",
  measurementId: "G-SBXYWZ2SQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
