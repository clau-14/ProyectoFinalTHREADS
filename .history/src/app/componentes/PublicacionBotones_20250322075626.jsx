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
  const [selectedPublication, setSelectedPublication] = useState(null); // Nueva variable para almacenar datos de la publicación

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setSelectedPublication(publicationData); 
    setIsModalOpen(true); // Abre el modal al hacer clic en "Comentar"
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleRepost = () => {
    console.log("Reposteo");
  };

  const handleShare = () => {
    console.log("Compartir");
  };

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
        onClose={handleCloseModal} // Pasa el cierre del modal
        onPublish={(content) => console.log("Contenido publicado:", content)} // Publicar datos
      />
    </>
  );
};

export default PublicacionBotones;


