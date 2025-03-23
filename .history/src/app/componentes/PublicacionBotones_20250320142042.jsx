import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeart } from "react-icons/io5"; // Agregar icono relleno para "Me gusta"
import React, { useState } from "react";
import { agregarMeGusta, quitarMeGusta } from "@/store/publicaciones";

const PublicacionBotones = ({ postId, userId, likes = [], onComment, onRepost, onShare }) => {
  // Validamos que likes sea un array y verificamos si el usuario actual dio "Me gusta"
  const [meGusta, setMeGusta] = useState(Array.isArray(likes) && likes.includes(userId));
  const [deshabilitar, setDeshabilitar] = useState(false); // Evita múltiples clics rápidos

  const manejarMeGusta = async () => {
    if (deshabilitar) return; // Evita que el usuario interactúe mientras el evento se procesa
    setDeshabilitar(true); // Deshabilita temporalmente el botón

    try {
      if (meGusta) {
        await quitarMeGusta(postId, userId);
        likes.splice(likes.indexOf(userId), 1); // Remover userId del array de likes
      } else {
        await agregarMeGusta(postId, userId);
        likes.push(userId); // Agregar userId al array de likes
      }
      setMeGusta(!meGusta); // Cambia el estado del botón localmente
    } catch (error) {
      console.error("Error al manejar 'Me gusta':", error.message);
    } finally {
      setDeshabilitar(false); // Habilita el botón después de completar el evento
    }
  };

  return (
    <div className="flex items-center gap-4 mt-3">
      {/* Botón de Me gusta */}
      <button
        onClick={manejarMeGusta}
        className={`hover:text-red-500 transition-transform transform hover:scale-110 ${
          deshabilitar ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={meGusta ? "Quitar Me gusta" : "Me gusta"}
        disabled={deshabilitar} // Deshabilita mientras se procesa
      >
        {meGusta ? <IoHeart /> : <IoHeartOutline />}
        <span>{likes.length}</span> {/* Mostrar número de likes */}
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



