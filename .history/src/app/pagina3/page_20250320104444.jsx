import Perfil from "../componentes/Perfil";
import { useState } from 'react';
import Modal from '../componentes/Modal';

const PaginaDos = () => {
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [publishedContent, setPublishedContent] = useState([]); // Estado local para publicaciones

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePublishContent = (content) => {
    setPublishedContent([...publishedContent, content]);
    setShowModal(false);
  };

const PerfilPage = () => {
    return(
        <div
        <button className='absolute right-12 bottom-5 bg-white rounded-xl border-2 p-7 shadow-lg text-2xl font-bold' onClick={handleOpenModal}><BiPlus /></button>
        {showModal && (
          <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent}  editingPost={editingPost} />
        )}
      </div>
    <Perfil />
    );
    };

    export default PerfilPage;