// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getAuth } from "firebase/auth"; // For Authentication
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1VUBfyvI7VFMqsYGxxopmglxq4V6VrvY",
  authDomain: "furistic-745fe.firebaseapp.com",
  databaseURL: "https://furistic-745fe-default-rtdb.firebaseio.com",
  projectId: "furistic-745fe",
  storageBucket: "furistic-745fe.appspot.com",
  messagingSenderId: "484350329990",
  appId: "1:484350329990:web:fd33ea346325f85f09bd07",
  measurementId: "G-VWVPX03C9V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;

