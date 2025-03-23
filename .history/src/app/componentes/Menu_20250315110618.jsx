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
  const [showLogout, setShowLogout] = useState(false); // Controlar el cuadro emergente
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
      <li className="relative hover:text-black w-12 h-12 flex items-center justify-center">
  <CgDetailsMore
    className="absolute"
    onClick={() => setShowLogoutButton(true)} // Al hacer clic, mostramos el segundo botón
  ></CgDetailsMore> {/* Esto cierra correctamente el componente */}
  
  {/* Segundo botón: aparecerá solo si `showLogoutButton` es true */}
  {showLogoutButton && (
    <button
      className="absolute top-16 bg-red-500 text-white py-2 px-4 rounded-md shadow-md"
      onClick={handleLogout} // Manejar el cierre de sesión
    >
      Cerrar Sesión
    </button>
  )}
</li>

      </ul> 

  </nav>
  
  )
};


export default Menu;


