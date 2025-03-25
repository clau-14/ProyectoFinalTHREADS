"use client";
import Contenido from '@/app/componentes/Contenido';
import Videoplayer from '../componentes/Videoplayer';
import Youtube from '../componentes/Youtube';
import Menu from '../componentes/Menu';
import Header from '../componentes/Header';
import Modal from '../componentes/Modal';
import { useState, useEffect } from 'react'; 
import { AiOutlineDown } from "react-icons/ai"; 
import { BiPlus } from "react-icons/bi"; 
import useUserStore from '@/store/userstore';
import toast, { Toaster } from 'react-hot-toast';
import PublicacionBotones from '../componentes/PublicacionBotones';
import { createPost } from "@/firebase/crud";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "@/firebase/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { likePost, unlikePost } from "@/firebase/crud";





export default function ContenidoPage() {
   const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
   const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado
   const [menuIndex, setMenuIndex] = useState(null); // Controla el menú desplegable
   const user = useUserStore((state) => state.user);
   const [posts, setPosts] = useState([]);


   const handleAddPost = async (content, userId, files = []) => {
    if (!userId) {
      console.error("Error: userId está indefinido. Verifica que el usuario esté autenticado.");
      return; // Salimos si `userId` no está disponible
    }
  
    try {
      const uploadedFiles = await Promise.all(files.map((file) => uploadFile(file))); // Subimos archivos
      const newPost = {
        content: content || "Sin contenido", // Aseguramos un valor predeterminado
        files: uploadedFiles || [], // Aseguramos que haya un array
        userId, // Este valor debe ser válido
        timestamp: new Date(),
        likes: [],
      };
  
      console.log("Datos listos para guardar en Firestore:", newPost);
      await createPost(newPost); // Guardamos los datos
      setPublishedContent([newPost, ...publishedContent]); // Actualizamos el estado local
    } catch (error) {
      console.error("Error creando la publicación:", error);
    }
  };
  
  
  const fetchPosts = async () => {
    try {
      const db = getFirestore(app); // Asegúrate de que `app` esté correctamente inicializado
      const querySnapshot = await getDocs(collection(db, "posts"));
      if (querySnapshot.empty) {
        console.log("No hay publicaciones disponibles.");
        return [];
      }
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content || ,
        files: doc.data().files || [],
        userId: doc.data().userId || null,
        likes: doc.data().likes || [],
        timestamp: doc.data().timestamp || null,
      }));
    } catch (error) {
      console.error("Error al recuperar las publicaciones desde Firestore:", error);
      return [];
    }
  };

  useEffect(() => {
    const userState = useUserStore.getState();
    userState.syncUserFromLocalStorage(); // Sincroniza el usuario
    console.log("Usuario sincronizado:", userState.user);
  }, []);
  

  
  const uploadFile = async (file) => {
    if (!(file instanceof File)) {
      console.error("Archivo inválido:", file);
      return null;
    }
  
    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al subir archivo:", error);
      return null;
    }
  };
  
  const addPostWithFile = async (text, files) => {
    try {
      const uploadedFiles = await Promise.all(files.map((file) => uploadFile(file))); // Subir todos los archivos
      await createPost({ text, files: uploadedFiles }); // Guardar publicación en Firestore
    } catch (error) {
      console.error("Error al crear publicación con archivos:", error);
    }
  };
   
 
  // Cargar contenido publicado
  useEffect(() => {
    const loadPosts = async () => {
      const firebasePosts = await fetchPosts();
      setPublishedContent(firebasePosts); // Estado sincronizado solo con Firebase
    };
    loadPosts();
  }, []);
  
  
   

   // Guardar contenido en localStorage cada vez que se actualice
   useEffect(() => {
     localStorage.setItem('publishedContent', JSON.stringify(publishedContent));
   }, [publishedContent]);

   useEffect(() => {
     const userState = useUserStore.getState();
     userState.syncUserFromLocalStorage();
     console.log("Usuario sincronizado:", userState.user);
   }, []);

   const handleOpenModal = () => {
     setShowModal(true);
   };
  
   const handleCloseModal = () => {
     setShowModal(false);
     setEditingPost(null);
   };

   const handlePublishContent = (content) => {
    if (editingPost !== null) {
      const updatedPosts = publishedContent.map((post, index) =>
        index === editingPost.index
          ? { ...post, content } // Actualiza el contenido de la publicación específica
          : post
      );
      setPublishedContent(updatedPosts);
    } else {
      console.error("Error: No se pudo editar la publicación.");
    }
    setShowModal(false);
    setEditingPost(null);
  };
  

  
  const handleEditPost = (index) => {
    const postToEdit = publishedContent[index]; // Obtener la publicación seleccionada
    setEditingPost({ ...postToEdit, index }); // Guardar la publicación y su índice
    setShowModal(true); // Abrir el modal
  };



const handleDeletePost = (index) => {
  // Eliminar la publicación seleccionada
  const updatedContent = publishedContent.filter((_, i) => i !== index);
  setPublishedContent(updatedContent);

  // Mostrar notificación tipo tostada
  toast.success("¡La publicación fue eliminada con éxito!", {
    position: "top-center", 
    autoClose: 3000,      
    hideProgressBar: false,
    closeOnClick: true,    
    pauseOnHover: true,   
    draggable: true,       
    progress: undefined,   
  });
};


   const toggleMenu = (index) => {
     setMenuIndex(menuIndex === index ? null : index);
   };
   const handleLikePost = async (postId) => {
    try {
      await likePost(postId, user?.uid); // Llamada a la función `likePost`
      const updatedPosts = publishedContent.map((post) =>
        post.id === postId
          ? { ...post, likes: [...post.likes, user?.uid] }
          : post
      );
      setPublishedContent(updatedPosts); // Actualiza el estado local
    } catch (error) {
      console.error("Error al dar 'Me gusta':", error);
    }
  };
  
  const handleUnlikePost = async (postId) => {
    try {
      await unlikePost(postId, user?.uid); // Llamada a la función `unlikePost`
      const updatedPosts = publishedContent.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes.filter((like) => like !== user?.uid) }
          : post
      );
      setPublishedContent(updatedPosts); // Actualiza el estado local
    } catch (error) {
      console.error("Error al quitar 'Me gusta':", error);
    }
  };


   const [editingPost, setEditingPost] = useState(null); // Estado para la publicación en edición


   return (
     <div className='relative w-full h-screen'>
        <Toaster />
       <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
       <div className='flex flex-col items-center justify-center h-full'>
         <section>
           <button className='absolute top-5 flex font-bold text-sm'>Para ti <span className='ml-3 bg-white border rounded-full p-1'><AiOutlineDown /></span></button>
         </section>
         <section style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
           className='container bg-white flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32'>
           <Header handleOpenModal={handleOpenModal} />
           <div className="absolute max-h-full top-32 flex-row">
             {publishedContent.map((post, index) => (
               <div key={index} className="published-content flex items-start mb-8 p-4 border-b  relative">
                 <img className="rounded-full w-12 h-12" src={post.userPhoto || null} alt="Foto de usuario" />
                 <div className="ml-4">
                   <h1 className="font-bold">{post.userName || "Usuario"}</h1>
                   {Array.isArray(post.content) && post.content.map((item, i)  => (
                     <div key={i} className="mt-2">
                       {/* Renderizar texto */}
                       {item.text && <p>{item.text}</p>}
                       {/* Renderizar imágenes */}
                       {item.files?.map((file, fileIndex) => (
                         <div key={fileIndex} className="mt-4">
                           {file.type === "image" && (
                             <img
                               className="w-full h-auto rounded-lg"
                               src={file.preview}
                               alt={file.name}
                             />
                           )}
                           {file.type === "video" && (
                             <video
                               className="w-full h-auto border rounded-lg mt-2"
                               src={file.preview}
                               controls
                             />
                           )}
                         </div>
                       ))}
                     </div>
                   ))}
                    <PublicacionBotones
                      onLike={() => handleLikePost(post.id)}
                      onUnlike={() => handleUnlikePost(post.id)}
                      likesCount={post.likes?.length || 0}
                      likedByUser={post.likes?.includes(user?.uid)}
                      onComment={() => console.log("Comentar", index)}
                      onRepost={() => console.log("Repostear", index)}
                      onShare={() => console.log("Compartir", index)}
                    />
                 </div>
                 {/* Menú desplegable */}
                 <div className="ml-auto relative">
                   <button
                     className="text-slate-600 font-bold"
                     onClick={() => toggleMenu(index)}
                   >
                     ...
                   </button>
                   {menuIndex === index && (
                     <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg text-left p-2 w-48">
                       <ul>
                          <li
                         className="hover:bg-gray-200 px-2 py-1 cursor-pointer"
                          onClick={() => handleEditPost(index)}
                        >
                          Editar publicación
                          </li>

                         <li 
                           className="hover:bg-gray-200 px-2 py-1 cursor-pointer"
                           onClick={() => handleDeletePost(index)}
                         >
                           Eliminar publicación
                         </li>
                       </ul>
                     </div>
                   )}
                 </div>
               </div>
             ))}
             <Contenido />
             <Youtube />
             <Contenido />
             <Youtube />
             <Videoplayer/>
             <Contenido />
             <Youtube />
           </div>
         </section>
       </div>
       <button className='absolute right-12 bottom-5 bg-white rounded-xl border-2 p-7 shadow-lg text-2xl font-bold' onClick={handleOpenModal}><BiPlus /></button>
       {showModal && (
         <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent}  editingPost={editingPost}  onAddPost={handleAddPost} />
       )}
     </div>
   );
}
