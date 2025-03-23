import { collection, getDocs, addDoc, onSnapshot, query, where, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
  import { db } from ".";
  
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
  
  // Agregar "Me gusta"
  export const agregarMeGusta = async (postId, userId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: arrayUnion(userId) // Agrega el userId al array de "likes"
      });
      console.log("¡Me gusta agregado!");
    } catch (error) {
      console.error("Error al agregar 'Me gusta':", error);
    }
  };
  
  // Quitar "Me gusta"
  export const quitarMeGusta = async (postId, userId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: arrayRemove(userId) // Elimina el userId del array de "likes"
      });
      console.log("¡Me gusta eliminado!");
    } catch (error) {
      console.error("Error al quitar 'Me gusta':", error);
    }
  };
  
