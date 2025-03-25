// Importar funciones necesarias desde Firestore
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./firebaseConfig"; // Importar la configuración de Firebase
import { arrayUnion, arrayRemove } from "firebase/firestore";

// **Crear una publicación**
export const createPost = async (content, userId) => {
  if (!content || !userId || !content.some((thread) => thread.text.trim() !== "")) {
    console.error("Error: Datos inválidos antes de enviar a Firestore.");
    console.log("Contenido:", content);
    console.log("userId:", userId);
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      content,
      userId,
      timestamp: new Date(),
      likes: [],
    });
    console.log("Post creado con ID:", docRef.id);
    return docRef.id; // Retorna el ID del documento creado
  } catch (error) {
    console.error("Error al guardar publicación en Firestore:", error);
    throw error;
  }
};

// **Leer publicaciones**
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    if (querySnapshot.empty) {
      console.log("No hay publicaciones disponibles.");
      return []; // Retornamos un array vacío si no hay posts
    }
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Publicaciones obtenidas:", posts);
    return posts;
  } catch (error) {
    console.error("Error leyendo posts: ", error);
    throw error; // Lanzamos el error para manejarlo adecuadamente
  }
};

// **Actualizar una publicación**
export const updatePost = async (postId, updatedData) => {
  if (!postId || !updatedData) {
    console.error("Error: postId o updatedData no válidos.");
    return;
  }

  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, updatedData);
    console.log("Post actualizado con éxito.");
  } catch (error) {
    console.error("Error actualizando post: ", error);
    throw error;
  }
};

// **Borrar una publicación**
export const deletePost = async (postId) => {
  if (!postId) {
    console.error("Error: postId no válido.");
    return;
  }

  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
    console.log("Post eliminado con éxito.");
  } catch (error) {
    console.error("Error eliminando post: ", error);
    throw error;
  }
};

// **Dar "me gusta" a un post**
export const likePost = async (postId, userId) => {
  if (!postId || !userId) {
    console.error("Error: postId o userId no válidos.");
    return;
  }

  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId), // Agrega el ID del usuario al array de "likes"
    });
    console.log("Me gusta añadido con éxito.");
  } catch (error) {
    console.error("Error al dar me gusta: ", error);
    throw error;
  }
};

// **Quitar "me gusta" de un post**
export const unlikePost = async (postId, userId) => {
  if (!postId || !userId) {
    console.error("Error: postId o userId no válidos.");
    return;
  }

  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId), // Elimina el ID del usuario del array de "likes"
    });
    console.log("Me gusta eliminado con éxito.");
  } catch (error) {
    console.error("Error al quitar me gusta: ", error);
    throw error;
  }
};
const cleanDocument = async (docId) => {
  const docRef = doc(db, "posts", docId);
  
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedContent = data.content.filter((thread) => thread.text.trim() !== ""); // Eliminamos vacíos
      await updateDoc(docRef, { content: updatedContent });
      console.log("Documento actualizado correctamente:", docId);
    } else {
      console.error("El documento no existe:", docId);
    }
  } catch (error) {
    console.error("Error al limpiar el documento:", error);
  }
};