import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD9CtvV68ty_zQhOUNH1Bj0ZaEi7J-VV_g",
  authDomain: "threads-a360a.firebaseapp.com",
  projectId: "threads-a360a",
  storageBucket: "threads-a360a.appspot.com", // Corregido
  messagingSenderId: "707836758648",
  appId: "1:707836758648:web:20efc83b00e0625485fb8d", // Corregido
};

// Inicializa Firebase solo si no está ya inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa el servicio de autenticación
const auth = getAuth(app);
console.log("Auth inicializado directamente:", auth);
// Exporta `app` y `auth`
export { app, auth };



