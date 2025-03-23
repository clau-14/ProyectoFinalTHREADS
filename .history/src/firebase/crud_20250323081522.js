import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./firebaseConfig"; // Importar la configuración de Firebase
import { arrayUnion, arrayRemove } from "firebase/firestore";

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
/ Dar "me gusta" a un post
export const likePost = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId), // Agrega el ID del usuario al array de "likes"
    });
    console.log("Me gusta añadido.");
  } catch (error) {
    console.error("Error al dar me gusta: ", error);
  }
};

// Quitar "me gusta" de un post
export const unlikePost = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId), // Elimina el ID del usuario del array de "likes"
    });
    console.log("Me gusta eliminado.");
  } catch (error) {
    console.error("Error al quitar me gusta: ", error);
  }
};