import { collection, addDoc } from "firebase/firestore";
import db from ""; // Configuración de Firebase

const guardarActividad = async (actividad) => {
  try {
    await addDoc(collection(db, "actividades"), actividad);
    console.log("Actividad guardada correctamente");
  } catch (error) {
    console.error("Error al guardar la actividad:", error);
  }
};

