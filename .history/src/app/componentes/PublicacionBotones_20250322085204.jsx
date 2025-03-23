"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";

const PublicacionBotones = () => {
  const [liked, setLiked] = useState(false); // Si está o no "Me gusta"
  const [likes, setLikes] = useState(0); // Contador de "Me gusta"
  const [showComments, setShowComments] = useState(false); // Controla la visibilidad de los comentarios
  const [comments, setComments] = useState([]); // Lista de comentarios para la publicación
  const [newComment, setNewComment] = useState(""); // Manejo de nuevo comentario

  // Datos de prueba para la publicación
  const publicationData = {
    text: "Esta es una publicación de prueba",
    photoURL: "https://via.placeholder.com/150",
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleComments = () => {
    setShowComments(!showComments); // Alterna la visibilidad de los comentarios
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]); // Agrega el nuevo comentario a la lista
      setNewComment(""); // Limpia el input
    }
  };

  return (
    <>
      <div className="border rounded-md p-4 mb-4">
        {/* Mostrar publicación */}
        <section className="mb-4">
          {publicationData.photoURL && (
            <img
              src={publicationData.photoURL}
              alt="Imagen de la publicación"
              className="w-full rounded-md mb-4"
            />
          )}
          {publicationData.text && <p>{publicationData.text}</p>}
        </section>

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
            onClick={toggleComments} // Mostrar u ocultar comentarios
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaRegComment />
            <span>{showComments ? "Ocultar comentarios" : "Mostrar comentarios"}</span>
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

        {/* Renderizar comentarios si están visibles */}
        {showComments && (
          <div className="mt-4 border-t pt-4">
            {/* Listar comentarios */}
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="border rounded-md p-2 mb-2">
                  {comment}
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aún no hay comentarios.</p>
            )}

            {/* Input para agregar nuevo comentario */}
            <div className="flex mt-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="flex-1 border rounded-md p-2"
              />
              <button
                onClick={handleAddComment}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Comentar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PublicacionBotones;




