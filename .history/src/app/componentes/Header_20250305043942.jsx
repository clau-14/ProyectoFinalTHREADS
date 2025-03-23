"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';





const Header = ({ handleOpenModal }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
        router.push("/pagina1");
    }
    
  }, [user, router]);
   
   
  return (
   <header className=' relative w-full h-screen  '>
    <article className='  inline-flex border-b-2   w-full items-center justify-center gap-2 -my-96 py-6 mt-1'>
      <img className='' src={user ? user.photoURL  : null} alt="" /> 
      <h1 className=' text-slate-400 '>¿Que novedases tienes?</h1>
      <button  onClick={handleOpenModal} className='border rounded-lg px-5 py-2 font-bold' >Publicar</button>
      </article>
      

   </header>

  );
};

export default Header;
