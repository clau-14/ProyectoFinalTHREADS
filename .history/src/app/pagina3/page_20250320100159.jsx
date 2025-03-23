"use client";
import { useEffect, useState } from "react";
import Perfil from "../componentes/Perfil";
import Menu from "../componentes/Menu";
import Modal from "../componentes/Modal";
import useUserStore from "@/store/userstore";


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
        <div className='relative w-full h-screen'>
    {/* Sección del menú */}
    <section className='absolute left-5 top-10'>
       <Menu handleOpenModal={handleOpenModal} />
      <Modal show={showModal}  onClose={handleCloseModal} onPublish={handlePublishContent} />
    </section>
    <Perfil />
    </div>
    );
    };

    export default PerfilPage;