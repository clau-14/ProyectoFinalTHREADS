import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeart } from "react-icons/io5"; // Agregar icono relleno para "Me gusta"
import React, { useState } from "react";
import { agregarMeGusta, quitarMeGusta } from "@/store/publicaciones";

const PublicacionBotones = ({ postId, userId, likes = [], onComment, onRepost, onShare }) => {
  // Aseguramos que likes sea un array válido y validamos userId
  const [meGusta, setMeGusta] = useState(
    Array.isArray(likes) && likes.includes(userId)
  );
  const [meGusta, setMeGusta] = useState(Array.isArray(likes) && likes.includes(userId));
  const [likesCount, setLikesCount] = useState(likes.length);
  const [deshabilitar, setDeshabilitar] = useState(false); // Evita múltiples clics rápidos

  const manejarMeGusta = async () => {
    if (deshabilitar) return;

    setDeshabilitar(true);
    try {
      if (meGusta) {
        await quitarMeGusta(postId, userId);
        setLikesCount((prev) => prev - 1);
      } else {
        await agregarMeGusta(postId, userId);
        setLikesCount((prev) => prev + 1);
      }
      setMeGusta(!meGusta);
    } catch (error) {
      console.error("Error al manejar 'Me gusta':", error.message);
    } finally {
      setDeshabilitar(false);
    }
  };

  return (
    <div className="flex items-center gap-6 mt-3">
      {/* Botón de Me gusta */}
      <button
        onClick={manejarMeGusta}
        className={`hover:text-red-500 transition-transform transform hover:scale-110 relative ${
          deshabilitar ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={meGusta ? "Quitar Me gusta" : "Me gusta"}
        disabled={deshabilitar} // Deshabilita mientras
      >
        {meGusta ? <IoHeart /> : <IoHeartOutline />}
        <span className="absolute left-5 -top-1  text-red-500">{likes.length}</span> {/* Muestra la cantidad de 'me gusta' */}
      </button>

      {/* Botón de Comentar */}
      <button
        onClick={onComment}
        className="hover:text-blue-500 transition-transform transform hover:scale-110"
        aria-label="Comentar"
      >
        <FaRegComment />
      </button>

      {/* Botón de Repostear */}
      <button
        onClick={onRepost}
        className="hover:text-green-500 transition-transform transform hover:scale-110"
        aria-label="Repostear"
      >
        <BiRepost />
      </button>

      {/* Botón de Compartir */}
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



