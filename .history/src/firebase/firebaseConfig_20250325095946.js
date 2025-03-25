// Importar funciones necesarias desde Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";



// Configuración de Firebase
const firebaseConfig = {
  npm uninstall @amraneze/react-instagram-login

};

// Inicializar Firebase solo si no está inicializado previamente
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializar Firestore y Auth con la instancia existente de `app`
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Inicializa el storage con la instancia existente de Firebase
console.log("Storage inicializado:", storage);




console.log("Firestore inicializado:", db);

export { app, auth, signOut };
export default db;
export { storage };

