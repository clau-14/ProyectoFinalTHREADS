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
    <Perfil />
    );
    };

    export default PerfilPage;