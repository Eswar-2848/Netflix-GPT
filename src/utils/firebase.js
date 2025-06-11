// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChWtRk5bFftuEDTEtdeBvNgvdhic5TyUc",
  authDomain: "netflixgpt-82248.firebaseapp.com",
  projectId: "netflixgpt-82248",
  storageBucket: "netflixgpt-82248.firebasestorage.app",
  messagingSenderId: "576114575816",
  appId: "1:576114575816:web:7d11b9d9cf2daff4f818fd",
  measurementId: "G-C9RB7CL8YP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
