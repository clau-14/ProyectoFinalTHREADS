// Importar funciones necesarias desde Firestore
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// Importar la instancia de Firestore desde firebaseConfig


// Función para manejar errores de manera centralizada
const handleError = (error, message) => {
  console.error(message, error);
  throw error; // Re-lanzamos el error para manejarlo más arriba si es necesario
};

// **Crear una publicación**
export const createPost = async (content, userId) => {
  if (!userId || typeof content !== "string" || content.trim() === "") {
    console.error("Error: userId no válido o content no válido.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      content: content || "Sin contenido", // Garantizamos un valor predeterminado
      userId: userId, // Validamos que tenga un valor válido
      timestamp: new Date(), // Fecha y hora actual
      likes: [], // Inicializamos los "likes"
    });
    console.log("Post creado con éxito. ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    handleError(error, "Error creando post:");
  }
};

// **Leer publicaciones**
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    if (querySnapshot.empty) {
      console.log("No hay publicaciones disponibles.");
      return [];
    }
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      formattedTimestamp: new Date(doc.data().timestamp).toLocaleString(), // Añadimos un timestamp formateado
    }));
    console.log("Publicaciones obtenidas:", posts);
    return posts;
  } catch (error) {
    handleError(error, "Error leyendo posts:");
  }
};

// **Actualizar una publicación**
export const updatePost = async (postId, updatedData) => {
  if (!postId || !updatedData || Object.keys(updatedData).length === 0) {
    console.error("Error: postId o updatedData no válidos.");
    return;
  }

  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, updatedData);
    console.log("Post actualizado con éxito.");
  } catch (error) {
    handleError(error, "Error actualizando post:");
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
    handleError(error, "Error eliminando post:");
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
    handleError(error, "Error al dar me gusta:");
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
    handleError(error, "Error al quitar me gusta:");
  }
};



