"use client";
import { useEffect, useState } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import useUserStore from "@/store/userstore";

export default function Perfil() {
  const [user, setUser] = useState(null);

  // Escuchar el estado del usuario
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || "Usuario",
          photoURL: currentUser.photoURL || "/default-avatar.png", // Foto por defecto si no hay
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      {/* Sección de Perfil */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <div className="flex items-center">
          <img
            src={user?.photoURL || "/default-avatar.png"} // Mostrar foto del usuario
            alt="Foto de perfil"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-xl font-bold">{user?.displayName || "Invitado"}</h1>
            <p className="text-gray-500">{user?.email || "Sin correo"}</p>
            <p className="text-sm text-gray-600">7 seguidores</p>
          </div>
          <button className="ml-auto bg-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-300">
            Editar perfil
          </button>
        </div>
      </div>

      {/* Formulario para Publicar */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="text-lg font-bold mb-3">Publicar</h2>
        <textarea
          placeholder="¿Qué novedades tienes?"
          className="w-full border border-gray-300 rounded-lg p-3 mb-3"
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Publicar
        </button>
      </div>

      {/* Sugerencias para Completar el Perfil */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-bold mb-3">Completa tu perfil</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <FaPen className="text-gray-500 mr-2" />
            Crear hilo
          </li>
          <li className="flex items-center">
            <AiOutlineUser className="text-gray-500 mr-2" />
            Seguir 10 perfiles
          </li>
          <li className="flex items-center">
            <FaPlus className="text-gray-500 mr-2" />
            Agregar presentación
          </li>
        </ul>
      </div>
    </div>
  );
}
