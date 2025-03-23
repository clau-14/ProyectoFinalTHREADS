import Perfil from "../componentes/Perfil";
impor|t { useState } from 'react';
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
impor

const PerfilPage = () => {
    const user = useUserStore((state) => state.user); // Obtener usuario desde userStore
    const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
     const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido 
     const handleOpenModal = () => {
       setShowModal(true); // Abre el modal
     };
   
     const handleCloseModal = () => {
       setShowModal(false); // Cierra el modal
     };
     const handlePublishContent = (content) => {
       if (user && user.displayName && user.photoURL) {
         const newPost = {
           content: content || [], // Asegurar que sea un array
           userName: user.displayName,
           userPhoto: user.photoURL,
         };
         setPublishedContent([...publishedContent, newPost]);
       } else {
         console.error("Datos del usuario no disponibles.");
       }
       setShowModal(false); // Cierra el modal después de publicar
     };
 
    return(
    <Perfil />
    );
    };

    export default PerfilPage;