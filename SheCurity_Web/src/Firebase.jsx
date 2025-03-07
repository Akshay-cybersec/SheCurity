// Import Firebase modules in the modular style
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, serverTimestamp, onChildAdded, off } from 'firebase/database';

// Your Firebase configuration
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

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

export { database, push, ref, serverTimestamp, onChildAdded, off };
