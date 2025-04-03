import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAkM10bJvr4t44scDZUtYLUp5sbxqA-gNU",
  authDomain: "react-task-88641.firebaseapp.com",
  projectId: "react-task-88641",
  storageBucket: "react-task-88641.appspot.com",
  messagingSenderId: "849042342315",
  appId: "1:849042342315:web:02ee32184fe04b8f1812ee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

