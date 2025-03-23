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






export default function ContenidoPage() {
   const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
   const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado
   const [menuIndex, setMenuIndex] = useState(null); // Controla el menú desplegable

   const user = useUserStore((state) => state.user);

   // Cargar contenido publicado
   useEffect(() => {
     const storedContent = JSON.parse(localStorage.getItem('publishedContent')) || [];
     setPublishedContent(storedContent);
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
      // Guardar cambios en la publicación editada
      const updatedPosts = [...publishedContent];
      updatedPosts[editingPost.index] = {
        ...updatedPosts[editingPost.index],
        content
      };
      setPublishedContent(updatedPosts);
    } else {
      // Crear nueva publicación
      if (user && user.displayName && user.photoURL) {
        const newPost = {
          content: content || [], // Asegurar que sea un array
          userName: user.displayName,
          userPhoto: user.photoURL
        };
        setPublishedContent([...publishedContent, newPost]);
      } else {
        console.error("Datos del usuario no disponibles.");
      }
    }
    setShowModal(false);
    setEditingPost(null); // Limpiar el estado de edición
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

   const [editingPost, setEditingPost] = useState(null); // Estado para la publicación en edición

  



   return (
     <div className='relative w-full h-screen'>
        <Toaster />
       <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
       <div className='flex flex-col items-center justify-center h-full'>
    
       
     </div>
     
   );
}
