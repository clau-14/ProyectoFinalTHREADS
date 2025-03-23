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
import { getAuth } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
console.log("Objeto auth en Menu:", auth);




const Menu = ({ handleOpenModal }) => {
  if (!auth) {
  const [activeIcon, setActiveIcon] = useState(null);
  const [showLogout, setShowLogout] = useState(false); // Controlar el cuadro emergente
  const router = useRouter();
  const auth = getAuth(auth);
  

  const handleLogout = async () => {
    console.log("Intentando cerrar sesión...");
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
      router.push("/Iniciosesion");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
  

  // Manejar el clic en el botón de opciones (último botón)
  const handleOptionsClick = () => {
    setShowLogout(!showLogout); // Alternar visibilidad del cuadro emergente
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
      <li className=" relative hover:text-black w-12 h-12 flex items-center justify-center ">
  <CgDetailsMore  onClick={handleOptionsClick} />
  {showLogout && (
    <div className="absolute top-14 bg-white text-black p-3 rounded-lg shadow-lg">
      <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
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


