// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCvAOqcm5lasjG2qRkUIflg_NP488zKiU",
  authDomain: "bee-productive-ab384.firebaseapp.com",
  projectId: "bee-productive-ab384",
  storageBucket: "bee-productive-ab384.firebasestorage.app",
  messagingSenderId: "711790421388",
  appId: "1:711790421388:web:d196ce3ed30a209e1ae2a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);