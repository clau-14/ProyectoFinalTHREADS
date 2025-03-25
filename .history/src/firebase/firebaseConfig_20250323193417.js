import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9CtvV68ty_zQhOUNH1Bj0ZaEi7J-VV_g",
  authDomain: "threads-a360a.firebaseapp.com",
  projectId: "threads-a360a",
  storageBucket: "threads-a360a.firebasestorage.app",
  messagingSenderId: "707836758648",
  appId: "1:707836758648:web:20efc83b00e0625485fb8d",
};

// Inicializamos Firebase solo si no está inicializado previamente
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
