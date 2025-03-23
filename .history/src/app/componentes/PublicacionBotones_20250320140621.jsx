import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import React, { useState } from "react";
import { agregarMeGusta, quitarMeGusta } from "@/store";
/
const PublicacionBotones = ({ postId, userId, likes , onComment, onRepost, onShare }) => {
 
  const [meGusta, setMeGusta] = useState(likes.includes(userId));

  const manejarMeGusta = async () => {
    if (meGusta) {
      await quitarMeGusta(postId, userId);
    } else {
      await agregarMeGusta(postId, userId);
    }
    setMeGusta(!meGusta); // Actualizar el estado local
  };


  return (
    <div className="flex gap-4 mt-3">
      <button
        onClick={manejarMeGusta}  className="hover:text-red-500 transition-transform transform hover:scale-110"
        aria-label="Me gusta">
      {meGusta ? "Quitar Me Gusta" : "Me Gusta"} ({likes.length})
        <IoHeartOutline />
      </button>
      <button
        onClick={onComment}
        className="hover:text-blue-500 transition-transform transform hover:scale-110"
        aria-label="Comentar"
      >
        <FaRegComment />
      </button>
      <button
        onClick={onRepost}
        className="hover:text-green-500 transition-transform transform hover:scale-110"
        aria-label="Repostear"
      >
        <BiRepost />
      </button>
      <button
        onClick={onShare}
        className="hover:text-purple-500 transition-transform transform hover:scale-110"
        aria-label="Compartir"
      >
        <TbShare3 />
      </button>
    </div>
  );
};

export default PublicacionBotones;

