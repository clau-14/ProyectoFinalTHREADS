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




"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firestore imports
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify"; // Para notificaciones tipo "tostada"
import { createPost, updatePost } from "@/firebase/crud";

export default function ContenidoPage() {
  const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
  const [publishedContent, setPublishedContent] = useState([]); // Contenido publicado
  const [menuIndex, setMenuIndex] = useState(null); // Controla el menú desplegable
  const [editingPost, setEditingPost] = useState(null); // Estado para edición
  const user = useUserStore((state) => state.user);

  const handleAddPost = async (content, userId, files = []) => {
    if (!userId) {
      console.error("Error: userId está indefinido. Verifica que el usuario esté autenticado.");
      return;
    }

    try {
      const uploadedFiles = await Promise.all(files.map((file) => uploadFile(file))); // Subir archivos
      const newPost = {
        content: content || "Sin contenido", // Aseguramos un valor predeterminado
        files: uploadedFiles || [],
        userId,
        timestamp: new Date(),
        likes: [],
      };

      console.log("Datos listos para guardar en Firestore:", newPost);
      await createPost(newPost);
      setPublishedContent([newPost, ...publishedContent]); // Actualizamos el estado local
    } catch (error) {
      console.error("Error creando la publicación:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const db = getFirestore(); // Asegúrate de que `app` esté correctamente configurado
      const querySnapshot = await getDocs(collection(db, "posts"));
      if (querySnapshot.empty) {
        console.log("No hay publicaciones disponibles.");
        return [];
      }
      return querySnapshot.docs.map((doc) => ({
        id: doc.id, // Incluye el ID único del documento
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error al recuperar publicaciones:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      const firebasePosts = await fetchPosts();
      setPublishedContent(firebasePosts); // Sincroniza con Firestore
    };
    loadPosts();
  }, []);

  const handleEditPost = (index) => {
    const postToEdit = publishedContent[index];
    if (!postToEdit || !postToEdit.id) {
      console.error("La publicación seleccionada no tiene un ID válido.");
      return;
    }

    setEditingPost(postToEdit); // Guardar publicación seleccionada
    setShowModal(true); // Abrir modal
  };

  const handlePublishContent = async (content) => {
    if (editingPost) {
      // Actualizar publicación existente
      try {
        await updatePost(editingPost.id, { content }); // Actualizar Firestore
        console.log("Publicación actualizada exitosamente:", content);
        const updatedPosts = publishedContent.map((post) =>
          post.id === editingPost.id ? { ...post, content } : post
        );
        setPublishedContent(updatedPosts); // Actualizar estado local
      } catch (error) {
        console.error("Error al actualizar la publicación:", error);
      }
    } else {
      // Crear nueva publicación
      if (user && user.displayName && user.photoURL) {
        const newPost = {
          content: content || "Sin contenido",
          userName: user.displayName,
          userPhoto: user.photoURL,
        };
        setPublishedContent([...publishedContent, newPost]);
      } else {
        console.error("Datos del usuario no disponibles.");
      }
    }
    setShowModal(false);
    setEditingPost(null); // Limpiar estado de edición
  };

  const handleDeletePost = (index) => {
    const updatedContent = publishedContent.filter((_, i) => i !== index);
    setPublishedContent(updatedContent);

    toast.success("¡La publicación fue eliminada con éxito!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const toggleMenu = (index) => {
    setMenuIndex(menuIndex === index ? null : index);
  };


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
