// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf0TYSbEQ29N6pEgYet1HT-7VUx2M0oN8",
  authDomain: "react-journal-13395.firebaseapp.com",
  projectId: "react-journal-13395",
  storageBucket: "react-journal-13395.appspot.com",
  messagingSenderId: "1064721255143",
  appId: "1:1064721255143:web:bd84f59c42dfb740bc3042",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
