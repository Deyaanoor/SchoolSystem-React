import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyATFRkaHmGF1dOAF6ikBs9PnAai1oj98oA",
  authDomain: "react-task-4edd3.firebaseapp.com",
  projectId: "react-task-4edd3",
  storageBucket: "react-task-4edd3.firebasestorage.app",
  messagingSenderId: "1074493469718",
  appId: "1:1074493469718:web:040ab90021b0132caa3137",
  measurementId: "G-D2J1B7C5JG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

