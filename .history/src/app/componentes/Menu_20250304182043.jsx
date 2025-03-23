"use client"
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi"; 
import { CgDetailsMore } from "react-icons/cg"; 
import { HiOutlineUser } from "react-icons/hi"; 
import { MdOutlinePushPin } from "react-icons/md"; 
import { BiSearch } from "react-icons/bi";  
import { AiFillHome } from "react-icons/ai"; import Modal from "./Modal"; 





const Menu = ({ handleOpenModal }) => {
  const [activeIcon, setActiveIcon] = useState(null);

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
     <BiPlus /> {/* Icono para agregar una nueva publicación */}
      </li>
      <li className={`${activeIcon === 'like' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('like')}
        >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
{/* icono para dar me gusta */}
      </li>
      <li className={`-mt-7 ${activeIcon === 'user' ? 'text-black' : 'w-12 h-12 flex items-center justify-center hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('user')}>
        <HiOutlineUser />
      </li>
      </ul>
      <ul className="mt-32 flex flex-col items-center justify-center gap-5 w-12 h-12 "> 
      <li className= ' hover:text-black'>
        <MdOutlinePushPin />
        
      </li>
      <li className= ' hover:text-black w-12 h-12 flex items-center justify-center'>
        <CgDetailsMore />
      </li>
      </ul> 
     
  </nav>
  
  )
};


export default Menu;


