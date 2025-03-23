"use client"
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi"; 
import { CgDetailsMore } from "react-icons/cg"; 
import { HiOutlineUser } from "react-icons/hi"; 
import { MdOutlinePushPin } from "react-icons/md"; 
import { BiSearch } from "react-icons/bi";  
import { AiFillHome } from "react-icons/ai"; 
import { IoHeartOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { auth } from "@/firebase/firebaseConfig"; // Ajusta la ruta si es necesario
import { getAuth, signOut } from "firebase/auth";
import pagina0 from "@/app/pagina0/page";
import




const Menu = ({ handleOpenModal }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [showLogoutOptions, setShowLogoutOptions] = useState(false); // Controlar el cuadro emergente
  const router = useRouter();
  
 
// Manejar el cierre de sesión
const handleLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("Sesión cerrada exitosamente.");
    router.push("pagina0")
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
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
          onClick={() => {
            handleIconClick('home'); // Marca el ícono como activo
            router.push("/pagina1"); // Navega a la página "pagina1"
          }}> 
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
      <li  className={`${activeIcon === 'like' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
        onClick={() => {
        handleIconClick('like'); // Marca el ícono como activo
       router.push("/pagina2"); // Navega a la página de "Actividad"
  }}
        >
      <IoHeartOutline />{/* icono para dar me gusta */}
      </li>
      <li className={` ${activeIcon === 'user' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
         onClick={() => {
          handleIconClick('like'); // Marca el ícono como activo
          router.push("/pagina3"); // Navega a la página de "Perfil"
    }}
        >
        <HiOutlineUser />
      </li>
      </ul>
      <ul className="mt-32 flex flex-col items-center justify-center gap-5 w-12 h-12 "> 
      <li className= ' hover:text-black'>
        <MdOutlinePushPin />
        
      </li>
      <li className="relative hover:text-black w-12 h-12 flex items-center justify-center">
      {/* Ícono del menú */}
      <CgDetailsMore
        className="relative hover:text-black w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={() => setShowLogoutOptions(!showLogoutOptions)} // Mostrar/Ocultar opciones
      />

      {/* Div con opciones para cerrar sesión */}
      {showLogoutOptions && (
        <div className="absolute -top-10 -right-32 bg-white text-black p-4 rounded-md shadow-lg w-48 font-bold text-sm">
          <button
            className="text-red-500 hover:text-red-700 w-full text-left"
            onClick={handleLogout} // cierre de sesión
          >
            Cerrar sesión
          </button>
          
        </div>
      )}
    </li>
    
      </ul> 

  </nav>
  
  
  )
};


export default Menu;


