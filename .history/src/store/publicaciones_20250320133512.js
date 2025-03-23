import { collection, getDocs, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Guardar una publicación
export const guardarPublicacion = async (post) => {
  try {
    await addDoc(collection(db, "posts"), post);
  } catch (error) {
    console.error("Error al guardar publicación:", error);
  }
};

// Obtener publicaciones de un usuario específico
export const obtenerPublicaciones = async (userId) => {
  const publicacionesQuery = query(
    collection(db, "posts"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(publicacionesQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Sincronizar publicaciones en tiempo real
export const sincronizarPublicaciones = (userId, callback) => {
  const publicacionesQuery = query(
    collection(db, "posts"),
    where("userId", "==", userId)
  );

  const unsub = onSnapshot(publicacionesQuery, (snapshot) => {
    const publicaciones = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(publicaciones);
  });

  return unsub; // Devuelve la función para detener la sincronización
};
