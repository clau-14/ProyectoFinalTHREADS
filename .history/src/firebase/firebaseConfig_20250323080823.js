// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth,  signOut  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9CtvV68ty_zQhOUNH1Bj0ZaEi7J-VV_g",
  authDomain: "threads-a360a.firebaseapp.com",
  projectId: "threads-a360a",
  storageBucket: "threads-a360a.firebasestorage.app",
  messagingSenderId: "707836758648",
  appId: "1:707836758648:web:20efc83b00e0625485fb8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



export { app, auth,  signOut };


console.log("Firestore inicializado:", db);
