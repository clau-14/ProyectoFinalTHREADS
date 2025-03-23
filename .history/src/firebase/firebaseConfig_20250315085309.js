"use client"
import { getAuth } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";

// Configuración temporal para depurar
const firebaseConfig = {
  apiKey: "AIzaSyD9CtvV68ty_zQhOUNH1Bj0ZaEi7J-VV_g",
  authDomain: "threads-a360a.firebaseapp.com",
  projectId: "threads-a360a",
  storageBucket: "threads-a360a.appspot.com",
  messagingSenderId: "707836758648",
  appId: "1:707836758648:web:20efc83b00e0625485fb8d",
};

// Inicialización local (para pruebas)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

console.log("Auth inicializado en el componente:", auth);


