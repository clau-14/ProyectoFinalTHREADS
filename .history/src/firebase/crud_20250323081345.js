import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./config"; // Importar la configuración de Firebase

// Crear una publicación
export const createPost = async (content, userId) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      content,
      userId,
      timestamp: new Date(),
      likes: []
    });
    console.log("Post creado: ", docRef.id);
  } catch (error) {
    console.error("Error creando post: ", error);
  }
};

// Leer publicaciones
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return posts;
  } catch (error) {
    console.error("Error leyendo posts: ", error);
  }
};

// Actualizar una publicación
export const updatePost = async (postId, updatedData) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, updatedData);
    console.log("Post actualizado");
  } catch (error) {
    console.error("Error actualizando post: ", error);
  }
};

// Borrar una publicación
export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
    console.log("Post eliminado");
  } catch (error) {
    console.error("Error eliminando post: ", error);
  }
};
