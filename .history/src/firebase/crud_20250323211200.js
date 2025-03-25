// Importar funciones necesarias desde Firestore
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./firebaseConfig"; // Importar la configuración de Firebase
import { arrayUnion, arrayRemove } from "firebase/firestore";

// **Crear una publicación**
export const createPost = async (content, userId) => {
  if (!userId || !content) {
    console.error("Error: userId o content no válidos.");
    return; // Salimos si algún campo es inválido
  }

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      content: content || "Sin contenido", // Garantizamos un valor predeterminado
      userId: userId, // Validamos que tenga un valor válido
      timestamp: new Date(), // Fecha y hora actual
      likes: [], // Inicializamos los "likes"
    });
    console.log("Post creado con éxito. ID:", docRef.id);
    return docRef.id; // Retornamos el ID de la publicación creada
  } catch (error) {
    console.error("Error creando post: ", error);
    throw error; // Lanzamos el error para manejarlo en la lógica de llamada
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


export const updatePost = async (postId, updatedData) => {
  try {
    const postRef = doc(db, "posts", postId); // Referencia al documento en Firestore
    await updateDoc(postRef, updatedData); // Actualizar el contenido en Firestore
    console.log("Post actualizado correctamente:", updatedData);
  } catch (error) {
    console.error("Error actualizando post:", error);
  }
};
