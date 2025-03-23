"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";
import ModalComentario from "./ModalComentario"; // Importa el modal
import useUserStore from "@/store/userstore"; // Importa el hook de usuario

const PublicacionBotones = ({ publication }) => {
  const [liked, setLiked] = useState(false); // Estado para "Me gusta" de la publicación
  const [likes, setLikes] = useState(0); // Contador para "Me gusta" de la publicación
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
    // Verifica si los datos del usuario existen
    console.log("Datos del usuario al publicar:", user);
  
    const newCommentThreads = newComments
      .filter((comment) => comment.text.trim() !== "")
      .map((comment) => ({
        id: Date.now() + Math.random(), // Generar un ID único para cada comentario
        text: comment.text,
        liked: false, // Nuevo estado para cada comentario
        likes: 0, // Contador inicial de "Me gusta"
        userName: user?.displayName || "Usuario Anónimo", // Usa valores predeterminados si falta información
        userPhotoURL: user?.photoURL || "https://via.placeholder.com/50", // Usa un placeholder si no hay foto
      }));
  
    if (newCommentThreads.length === 0) {
      console.log("No se encontraron comentarios para agregar.");
      return; // Detén la ejecución si no hay comentarios válidos
    }
  
    setComments((prev) => [...prev, ...newCommentThreads]); // Agrega los nuevos comentarios al estado
    setIsModalOpen(false); // Cierra el modal
  };
  
  

  const handleToggleLikeComment = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <>
      <div className="p-4 mb-4 bg-gray-100 rounded-md shadow-sm">
        {/* Mostrar publicación */}
        {publication && (
          <section className="mb-4">
            {publication.photoURL && (
              <img
                src={publication.photoURL}
                alt="Imagen de la publicación"
                className="w-full rounded-md mb-4"
              />
            )}
            {publication.text && <p className="text-gray-800">{publication.text}</p>}
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
            onClick={handleComment}
            className="hover:text-blue-500 transition-transform transform hover:scale-110 flex items-center"
          >
            <FaRegComment />
          </button>
          <button
            onClick={() => console.log("Reposteo")}
            className="hover:text-green-500 transition-transform transform hover:scale-110 flex items-center"
          >
            <BiRepost />
          </button>
          <button
            onClick={() => console.log("Compartir")}
            className="hover:text-purple-500 transition-transform transform hover:scale-110 flex items-center"
          >
            <TbShare3 />
          </button>
        </div>

        {/* Renderizar comentarios */}
        {comments.length > 0 && (
          <div className="mt-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-2 mb-2 bg-white rounded-md shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">{comment.text}</span>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
                {/* Botones de acciones del comentario */}
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleToggleLikeComment(comment.id)}
                    className={`transition-transform transform hover:scale-110 flex items-center gap-1 ${
                      comment.liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {comment.liked ? <IoHeartSharp /> : <IoHeartOutline />}
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => console.log("Responder comentario")}
                    className="transition-transform transform hover:scale-110 text-blue-500"
                  >
                    <FaRegComment />
                  </button>
                  <button
                    onClick={() => console.log("Reposteo en comentario")}
                    className="transition-transform transform hover:scale-110 text-green-500"
                  >
                    <BiRepost />
                  </button>
                  <button
                    onClick={() => console.log("Compartir comentario")}
                    className="transition-transform transform hover:scale-110 text-purple-500"
                  >
                    <TbShare3 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ModalComentario */}
      <ModalComentario
        show={isModalOpen}
        onClose={handleCloseModal}
        onPublish={handlePublish}
      />
    </>
  );
};

export default PublicacionBotones;



