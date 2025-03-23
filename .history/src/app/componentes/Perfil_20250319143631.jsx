"use client";
import { useState } from 'react';
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
import Menu from '../componentes/Menu';
import PerfilUser from '../componentes/PerfilUser';
import { AiOutlineDown } from 'react-icons/ai';
import Modal from './Modal';

export default function Perfil() {
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

  return (
    <div className='relative w-full h-screen'>
    {/* Sección del menú */}
    <section className='absolute left-5 top-10'>
      <Menu />
      <Modal show={showModal} handleOpenModal={handleOpenModal} onClose={handleCloseModal} onPublish={handlePublishContent} />
    </section>
    
    {/* Contenido principal */}
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <section>
        <button className='absolute top-5 flex font-bold text-sm'>
          Perfil
          <span className='ml-3 bg-white border rounded-full p-1'>
            <AiOutlineDown /> 
          </span>
        </button>
      </section>
      <section className='container bg-white flex-col items-center justify-center w-2/5 rounded-3xl h-screen fixed mt-16 -top-2'>
        <PerfilUser/>
      </section>
    </div>
  </div>
 );
}


  
