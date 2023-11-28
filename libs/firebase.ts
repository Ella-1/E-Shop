// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC4zvD5HwpgEkSnQnNX0zYT-CZuxte-EE",
  authDomain: "e-commerce-shop-1e9a4.firebaseapp.com",
  projectId: "e-commerce-shop-1e9a4",
  storageBucket: "e-commerce-shop-1e9a4.appspot.com",
  messagingSenderId: "678158933413",
  appId: "1:678158933413:web:476c9cd344405216ad1c4c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;