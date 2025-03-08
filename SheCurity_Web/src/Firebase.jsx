// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXnL39VxA4rTqpWQxkRJZKgkcuPj0dQ24",
  authDomain: "shecurity-921b9.firebaseapp.com",
  projectId: "shecurity-921b9",
  storageBucket: "shecurity-921b9.firebasestorage.app",
  messagingSenderId: "454814611533",
  appId: "1:454814611533:web:510130a5aa10d9b4bf8404",
  measurementId: "G-JLZ0BMZC9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
