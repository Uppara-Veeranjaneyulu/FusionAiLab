// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fusionaiproject.firebaseapp.com",
  projectId: "fusionaiproject",
  storageBucket: "fusionaiproject.firebasestorage.app",
  messagingSenderId: "35717423740",
  appId: "1:35717423740:web:6b7ef77d8134b132a75ff9",
  measurementId: "G-DM26094E0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, 'fusionaiproject')
//