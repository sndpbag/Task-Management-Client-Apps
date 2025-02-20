// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4rwqlqjIMKsCui8bQiuFSO0AfHgkscvE",
  authDomain: "singup-18412.firebaseapp.com",
  projectId: "singup-18412",
  storageBucket: "singup-18412.firebasestorage.app",
  messagingSenderId: "125722197742",
  appId: "1:125722197742:web:f80661b702f6ac0e65fdff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);