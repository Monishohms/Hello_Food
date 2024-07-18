// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbjOKspNbbH0J9Xc516oBvJnSI7GWr0Co",
  authDomain: "hellofood-266b2.firebaseapp.com",
  projectId: "hellofood-266b2",
  storageBucket: "hellofood-266b2.appspot.com",
  messagingSenderId: "6658627569",
  appId: "1:6658627569:web:52fef31835bd25e4c39650",
  measurementId: "G-4FZFSS7CJZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
