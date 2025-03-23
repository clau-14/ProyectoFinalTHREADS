import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const guardarComentario = async (commentData) => {
  try {
    await addDoc(collection(db, "comments"), commentData);
    console.log("¡Comentario guardado con éxito!");
  } catch (error) {
    console.error("Error al guardar el comentario:", error);
  }
};
