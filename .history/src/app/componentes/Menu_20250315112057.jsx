"use client"
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi"; 
import { CgDetailsMore } from "react-icons/cg"; 
import { HiOutlineUser } from "react-icons/hi"; 
import { MdOutlinePushPin } from "react-icons/md"; 
import { BiSearch } from "react-icons/bi";  
import { AiFillHome } from "react-icons/ai"; 
import Modal from "./Modal"; 
import { IoHeartOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { auth } from "@/firebase/firebaseConfig"; // Ajusta la ruta si es necesario
import { getAuth, signOut } from "firebase/auth";


const Menu = ({ handleOpenModal }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // Controlar el cuadro emergente
  const [showLogoutButton, setShowLogoutButton] = useState(false); // Controlar el segundo botón

  const router = useRouter();
  

// Manejar el cierre de sesión
const handleLogout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sesión cerrada exitosamente.");
      router.push("/Iniciosesion"); // Redirigir a la página de inicio de sesión
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
};

// Mostrar confirmación al hacer clic en el botón
const confirmLogout = () => {
  if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    handleLogout();
  }
};


  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  
  return (
    <nav className="menu  flex-col flex-wrap left-7 text-gray-300 text-3xl fixed">
    <ul className="flex flex-col items-center justify-center gap-7   ">
      <li><img src="/Container.png" alt="" /></li>
      <li className= {`mt-11 ${activeIcon === 'home' ? 'text-black' : ' w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('home')}> 
        <AiFillHome /> {/* Icono para ir a la página de inicio */}
      </li>
      <li className={`${activeIcon === 'search' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('search')}>
        <BiSearch /> {/* Icono para buscar publicaciones */}
      </li>
      <li onClick={handleOpenModal} className=  {`p-2 rounded-lg bg-slate-100 ${activeIcon === 'plus' ? 'w-12 h-12 flex items-center justify-center text-black' : 'hover:bg-gray-200 hover:text-black active:bg-gray-300'}`}
          onClick={() => { handleIconClick('plus'); handleOpenModal(); }}>
     <BiPlus /> {/* Icono para agregar una <IoHeartDislikeOutline />nueva publicación */}
      </li>
      <li className={`${activeIcon === 'like' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('like')}
        >
      <IoHeartOutline />{/* icono para dar me gusta */}
      </li>
      <li className={` ${activeIcon === 'user' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('user')}>
        <HiOutlineUser />
      </li>
      </ul>
      <ul className="mt-32 flex flex-col items-center justify-center gap-5 w-12 h-12 "> 
      <li className= ' hover:text-black'>
        <MdOutlinePushPin />
        
      </li>
      <div className="relative">
      {/* Ícono del menú */}
      <CgDetailsMore
        className="cursor-pointer text-3xl hover:text-gray-700"
        onClick={() => setShowMenu(!showMenu)} // Mostrar/Ocultar el menú desplegable
      />

      {/* Menú desplegable */}
      {showMenu && (
        <ul className="absolute ">
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Apariencia
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Estadísticas
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Configuración
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Reportar un problema
          </li>
          <li
            className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
            onClick={handleLogout} // Manejar el cierre de sesión
          >
            Cerrar sesión
          </li>
        </ul>
      )}
    </div>
      </ul> 

  </nav>
  
  )
};


export default Menu;


