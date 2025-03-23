"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";
import ModalComentario from "./ModalComentario"; // Importa el modal

const PublicacionBotones = () => {
  const [liked, setLiked] = useState(false); // Si está o no "Me gusta"
  const [likes, setLikes] = useState(0); // Contador de "Me gusta"
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
  const [selectedPublication, setSelectedPublication] = useState(null); // Maneja datos de la publicación

  // Datos de prueba para la publicación
  const publicationData = {
    text: "Esta es una publicación de prueba",
    photoURL: "https://via.placeholder.com/150",
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setSelectedPublication(publicationData); // Asigna datos de la publicación
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedPublication(null); // Limpia los datos
  };

  const handleRepost = () => {
    console.log("Reposteo");
  };

  const handleShare = () => {
    console.log("Compartir");
  };
  const [editingPost, setEditingPost] = useState(null); // Estado para la publicación en edición

  return (
    <>
      <div className="flex gap-4 mt-3">
        <button
          onClick={handleLike}
          className={`transition-transform transform hover:scale-110 flex items-center gap-1 ${
            liked ? "text-red-500" : "text-gray-500"
          }`}
        >
          {liked ? <IoHeartSharp /> : <IoHeartOutline />}
          <span>{likes}</span>
        </button>
        <button
          onClick={handleComment} // Abre el modal
          className="hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaRegComment />
        </button>
        <button
          onClick={handleRepost}
          className="hover:text-green-500 transition-transform transform hover:scale-110"
        >
          <BiRepost />
        </button>
        <button
          onClick={handleShare}
          className="hover:text-purple-500 transition-transform transform hover:scale-110"
        >
          <TbShare3 />
        </button>
      </div>

      {/* ModalComentario */}
      <ModalComentario
        show={isModalOpen}
        onClose={handleCloseModal}
        publication={selectedPublication} // Pasa los datos de la publicación
        onPublish={(content) => console.log("Contenido publicado:", content)} // Publicar datos
      />
    </>
  );
};

export default PublicacionBotones;



