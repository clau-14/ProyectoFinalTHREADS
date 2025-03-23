import Perfil from "../componentes/Perfil";
import { useState } from 'react';
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
import Modal from "../componentes/Modal";

const PerfilPage = () => {
  const user = useUserStore((state) => state.user) || {}; // Obtener usuario desde userStore
  const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
  const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido 

  const handleOpenModal = () => {
    setShowModal(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
  };

  const handlePublishContent = (content) => {
    const newPost = {
      content: content || [],
      userName: user?.displayName || "Usuario Anónimo",
      userPhoto: user?.photoURL || "ruta/imagen-por-defecto.jpg",
    };
    setPublishedContent([...publishedContent, newPost]);
    setShowModal(false); // Cierra el modal después de publicar
  };

  return (
    <>
      <Perfil />
      <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent} />
    </>
  );
};

export default PerfilPage;
