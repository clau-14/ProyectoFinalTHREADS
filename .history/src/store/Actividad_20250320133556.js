import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const registrarActividad = async (activity) => {
  try {
    await addDoc(collection(db, "activities"), activity);
    console.log("¡Actividad registrada!");
  } catch (error) {
    console.error("Error al registrar actividad:", error);
  }
};
