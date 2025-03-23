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
    <ul className="flex flex-col items-center justify-center gap-10  ">
      <li><img src="/Container.png" alt="" /></li>
      <li className= {`mt-11 ${activeIcon === 'home' ? 'text-black' : 'hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('home')}> 
        <AiFillHome /> {/* Icono para ir a la página de inicio */}
      </li>
      <li className={`${activeIcon === 'search' ? 'text-black' : 'hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('search')}>
        <BiSearch /> {/* Icono para buscar publicaciones */}
      </li>
      <li onClick={handleOpenModal} className=  {`p-2 rounded-lg bg-slate-100 ${activeIcon === 'plus' ? 'text-black' : 'hover:bg-gray-200 hover:text-black active:bg-gray-300'}`}
          onClick={() => { handleIconClick('plus'); handleOpenModal(); }}>
     <BiPlus /> {/* Icono para agregar una nueva publicación */}
      </li>
      <li className={`${activeIcon === 'like' ? 'text-black' : 'hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('like')}
        >
      <img src="/like.png" alt="" />{/* icono para dar me gusta */}
      </li>
      <li className={`-mt-7 ${activeIcon === 'user' ? 'text-black' : 'hover:bg-gray-200 hover:p-1 hover:rounded-lg active:bg-gray-300'}`}
          onClick={() => handleIconClick('user')}>
        <HiOutlineUser />
      </li>
      </ul>
      <ul className="mt-32 flex flex-col items-center justify-center gap-5"> 
      <li className={`${activeIcon === 'pin' ? 'text-black' : ''}`}
          onClick={() => handleIconClick('pin')}>
        <MdOutlinePushPin />
        
      </li>
      <li className= ' hover:text-black'
          onClick={() => handleIconClick('details')} >
        <CgDetailsMore />
      </li>
      </ul> 
     
  </nav>
  
  )
};


export default Menu;


