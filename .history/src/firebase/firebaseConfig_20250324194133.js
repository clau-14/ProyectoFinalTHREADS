// Importar funciones necesarias desde Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  console.log("Firebase App inicializado correctamente:", app);
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
}

// Inicializar Firestore, Auth y Storage
let db, auth, storage;
try {
  if (app) {
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    console.log("Firestore inicializado:", db);
    console.log("Auth inicializado:", auth);
    console.log("Storage inicializado:", storage);
  } else {
    throw new Error("La instancia de Firebase no se inicializó correctamente.");
  }
} catch (error) {
  console.error("Error al inicializar servicios de Firebase:", error);
}

// Exportar las instancias para usarlas en todo el proyecto
export { app, auth, signOut, storage };
export default db;


