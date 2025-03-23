"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";

const PublicacionBotones = ({  }) => {
  const [liked, setLiked] = useState(false); // Si está o no "Me gusta"
  const [likes, setLikes] = useState(0); // Contador de "Me gusta"

  

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1); // Quitar un "Me gusta"
    } else {
      setLikes(likes + 1); // Agregar un "Me gusta"
    }
    setLiked(!liked); // Alterna entre "Me gusta" y "No me gusta"
  };

  const [showInput, setShowInput] = useState(false); // Mostrar u ocultar el input
  const [showComments, setShowComments] = useState(false); // Mostrar u ocultar comentarios
  const [comments, setComments] = useState([]); // Array de comentarios
  const [comment, setComment] = useState(""); // Comentario actual

  const handleToggleInput = () => {
    setShowInput(!showInput); // Alterna el input de comentarios
  };

  const handleToggleComments = () => {
    setShowComments(!showComments); // Alterna la visibilidad de los comentarios
  };

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]); // Agrega el comentario al array
      setComment(""); // Limpia el input
      setShowInput(false); // Oculta el input tras enviar el comentario
    }
  };



  const handleRepost = () => {
    console.log("Reposteo"); // Acciones para repostear
  };

  const handleShare = () => {
    console.log("Compartir"); // Acciones para compartir
  };



  return (
    <div className="flex gap-4 mt-3">
      <button
       onClick={handleLike}
       className={`transition-transform transform hover:scale-110 flex items-center gap-1 ${
         liked ? "text-red-500" : "text-gray-500"
       }`}
 
      >{/* Mostrar el contador de "Me gusta" */}
       
       {liked ? <IoHeartSharp /> : <IoHeartOutline />}

      <span>{likes}</span>


      </button>
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleInput}
          className="hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaRegComment />
        </button>
        <button
        onClick={handleToggleComments}
        className="hover:text-blue-500 transition-transform transform hover:scale-110"
      >
        {showComments ? "Ocultar comentarios" : "Ver comentarios"}
      </button>

      {/* Lista de comentarios */}
      {showComments && (
        <div className="mt-3">
          <ul>
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <li key={index} className="border-b p-2">
                  {c}
                </li>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </ul>
          <button
            onClick={handleToggleInput}
            className="text-green-500 hover:text-green-700 mt-2"
          >
            {showInput ? "Cancelar" : "Agregar comentario"}
          </button>

          {/* Input de texto para agregar comentarios */}
          {showInput && (
            <div className="mt-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="border p-2 w-full rounded"
              />
              <button
                onClick={handleComment}
                className="bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-700"
              >
                Enviar
              </button>
            </div>
          )}
        </div>
      )}


      <button
        onClick={handleRepost}  // Llama a la función para repostear
        className="hover:text-green-500 transition-transform transform hover:scale-110"
        aria-label="Repostear"
      >
        <BiRepost />
      </button>
      <button
        onClick={handleShare} // Llama a la función para compartir
        className="hover:text-purple-500 transition-transform transform hover:scale-110"
        aria-label="Compartir"
      >
        <TbShare3 />
      </button>
      
    </div>
  );
};

export default PublicacionBotones;

