// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aifusionlab-c1ffa.firebaseapp.com",
  projectId: "aifusionlab-c1ffa",
  storageBucket: "aifusionlab-c1ffa.firebasestorage.app",
  messagingSenderId: "976946067582",
  appId: "1:976946067582:web:645a878334dc62c8a6c02f",
  measurementId: "G-D1S4YMS2ZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 