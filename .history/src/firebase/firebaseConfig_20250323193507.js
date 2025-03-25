// Importar funciones necesarias desde Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD9CtvV68ty_zQhOUNH1Bj0ZaEi7J-VV_g",
  authDomain: "threads-a360a.firebaseapp.com",
  projectId: "threads-a360a",
  storageBucket: "threads-a360a.firebasestorage.app",
  messagingSenderId: "707836758648",
  appId: "1:707836758648:web:20efc83b00e0625485fb8d",
};

// Inicializar Firebase solo si no está inicializado previamente
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializar Firestore y Auth con la instancia existente de `app`
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Firestore inicializado:", db);

export { app, auth, signOut };
export default db;

