"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";
import ModalComentario from "./ModalComentario"; // Importa el modal

const PublicacionBotones = ({ publication }) => {
  const [liked, setLiked] = useState(false); // Si está o no "Me gusta"
  const [likes, setLikes] = useState(0); // Contador de "Me gusta"
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
  const [comments, setComments] = useState([]); // Lista de comentarios

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handlePublish = (newComments) => {
    // Agregar los comentarios publicados al estado
    const newCommentThreads = newComments.map((comment) => ({
      id: Date.now() + Math.random(), // Generar un ID único para cada comentario
      text: comment.text,
    }));
    setComments((prev) => [...prev, ...newCommentThreads]);
    setIsModalOpen(false); // Cierra el modal
  };

  const handleDeleteComment = (id) => {
    // Filtrar el comentario eliminado
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <>
      <div className="border rounded-md p-4 mb-4">
        {/* Validar publicación antes de intentar renderizar */}
        {publication && (
          <section className="mb-4">
            {publication.photoURL && (
              <img
                src={publication.photoURL}
                alt="Imagen de la publicación"
                className="w-full rounded-md mb-4"
              />
            )}
            {publication.text && <p>{publication.text}</p>}
          </section>
        )}

        {/* Botones de acciones */}
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
            onClick={() => console.log("Reposteo")}
            className="hover:text-green-500 transition-transform transform hover:scale-110"
          >
            <BiRepost />
          </button>
          <button
            onClick={() => console.log("Compartir")}
            className="hover:text-purple-500 transition-transform transform hover:scale-110"
          >
            <TbShare3 />
          </button>
        </div>

        {/* Renderizar comentarios */}
        {comments.length > 0 && (
          <div className="mt-4 border-t pt-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border rounded-md p-2 mb-2 flex justify-between items-center"
              >
                <span>{comment.text}</span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ModalComentario */}
      <ModalComentario
        show={isModalOpen}
        onClose={handleCloseModal}
        onPublish={handlePublish} // Publicar datos al padre
      />
    </>
  );
};

export default PublicacionBotones;


