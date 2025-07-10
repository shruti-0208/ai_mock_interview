// firebase/client.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration with fallbacks for debugging
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAmNM60_XGISWK4xMeExr8zmu1H86SAlF8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "prepwise-85178.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "prepwise-85178",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "prepwise-85178.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "611761516945",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:611761516945:web:96e3da999cfffc0c2f6a30",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-BXM40DEGQ4",
};

// Debug: Check if environment variables are loaded
console.log('Firebase Config Debug:', {
  apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
  authDomain: firebaseConfig.authDomain ? 'Set' : 'Missing',
  projectId: firebaseConfig.projectId ? 'Set' : 'Missing',
  storageBucket: firebaseConfig.storageBucket ? 'Set' : 'Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'Set' : 'Missing',
  appId: firebaseConfig.appId ? 'Set' : 'Missing'
});

// Validate required fields
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.error('Missing Firebase configuration fields:', missingFields);
  console.error('Make sure these environment variables are set in Vercel:',
      missingFields.map(field => `NEXT_PUBLIC_FIREBASE_${field.toUpperCase()}`));
  throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
}

// Initialize Firebase
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };