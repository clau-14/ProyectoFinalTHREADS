import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const crearNotificacion = async (notification) => {
  try {
    await addDoc(collection(db, "notifications"), notification);
    console.log("¡Notificación creada!");
  } catch (error) {
    console.error("Error al crear notificación:", error);
  }
};
