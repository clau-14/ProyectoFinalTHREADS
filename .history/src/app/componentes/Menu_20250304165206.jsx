"use client"
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi"; 
import { CgDetailsMore } from "react-icons/cg"; 
import { HiOutlineUser } from "react-icons/hi"; 
import { MdOutlinePushPin } from "react-icons/md"; 
import { BiSearch } from "react-icons/bi";  
import { AiFillHome } from "react-icons/ai"; import Modal from "./Modal"; 





const Menu = ({ handleOpenModal }) => {

  
  
  return (
    <nav className="menu  flex-col flex-wrap left-7 text-gray-300 text-4xl fixed">
    <ul className="flex flex-col items-center justify-center gap-9">
      <li><img src="/Container.png" alt="" /></li>
      <li className="mt-5"> 
        <AiFillHome /> {/* Icono para ir a la página de inicio */}
      </li>
      <li >
        <BiSearch /> {/* Icono para buscar publicaciones */}
      </li>
      <li onClick={handleOpenModal} className=  "p-2 rounded-lg bg-slate-100 ">
     <BiPlus /> {/* Icono para agregar una nueva publicación */}
      </li>
      <li>
      <img src="/like.png" alt="" />{/* icono para dar me gusta */}
      </li>
      <li clas>
        <HiOutlineUser />
      </li>
      </ul>
      <ul className="mt-24 flex flex-col items-center justify-center gap-5"> 
      <li >
        <MdOutlinePushPin />
        
      </li>
      <li>
        <CgDetailsMore />
      </li>
      </ul> 
     
  </nav>
  
  )
};


export default Menu;


