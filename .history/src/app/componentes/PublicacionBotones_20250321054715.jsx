"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";

const PublicacionBotones = ({  }) => {
  const [likes, setLikes] = useState(0); // Estado para contar los "Me gusta"

  const handleLike = () => {
    setLikes(likes + 1); // Incrementa el contador
  };
  const handleComment = () => {
    console.log("Comentario"); // Acciones para comentar
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
        className="hover:text-red-500 transition-transform transform hover:scale-110 inline-flex items-center"
        aria-label="Me gusta"
      >{/* Mostrar el contador de "Me gusta" */}
      <span>{likes}</span>

        <IoHeartOutline />

      </button>
      <button
        onClick={handleComment} // Llama a la función para comentar
        className="hover:text-blue-500 transition-transform transform hover:scale-110"
        aria-label="Comentar"
      >
        <FaRegComment />
      </button>
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

