import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace these placeholders with your actual Firebase configuration keys.
// You can get these by creating a new project at https://console.firebase.google.com
// Click the Web icon (</>) to register an app, and copy the firebaseConfig object here.
const firebaseConfig = {
  apiKey: "AIzaSyBW1eUcqyi6RUVycPKsSD6rNz0fVCTj1G4",
  authDomain: "doclensbd-1cdeb.firebaseapp.com",
  projectId: "doclensbd-1cdeb",
  storageBucket: "doclensbd-1cdeb.firebasestorage.app",
  messagingSenderId: "190460046287",
  appId: "1:190460046287:web:dbb20cce777a84744c80ba",
  measurementId: "G-MD5CQ7MDP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Database
export const auth = getAuth(app);
export const db = getFirestore(app);
