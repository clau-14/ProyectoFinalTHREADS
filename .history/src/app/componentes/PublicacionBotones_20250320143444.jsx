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
  const [likesCount, setLikesCount] = useState(likes.length); // Actualizar visualmente el conteo de likes
  const [deshabilitar, setDeshabilitar] = useState(false); // Evita múltiples clics rápidos

  const manejarMeGusta = async () => {
    if (deshabilitar) return; // Evita que el usuario interactúe mientras el evento se procesa

    // Validar que postId y userId estén definidos
    if (!postId || !userId) {
      console.error("Error: postId o userId no están definidos.");
      return;
    }

    setDeshabilitar(true); // Deshabilita temporalmente el botón

    try {
      if (meGusta) {
        await quitarMeGusta(postId, userId);
        setLikesCount((prevCount) => prevCount - 1); // Actualiza la cuenta localmente
      } else {
        await agregarMeGusta(postId, userId);
        setLikesCount((prevCount) => prevCount + 1); // Actualiza la cuenta localmente
      }
      setMeGusta(!meGusta); // Cambia el estado del botón
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
        className={`hover:text-red-500 transition-transform transform hover:scale-110 relative ${
          deshabilitar ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={meGusta ? "Quitar Me gusta" : "Me gusta"}
        disabled={deshabilitar} // Deshabilita mientras
      >
        {meGusta ? <IoHeart /> : <IoHeartOutline />}
        <span className="absolute left-5 -top-2">{likes.length}</span> {/* Muestra la cantidad de 'me gusta' */}
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



