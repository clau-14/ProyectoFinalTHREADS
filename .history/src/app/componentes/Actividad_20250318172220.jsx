"use client";
import Menu from '../componentes/Menu';
import { useState } from 'react';

  


export default function Actividad() {
   return (
     <div className='relative w-full h-screen'>
        
       <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
       <div className='flex flex-col items-center justify-center h-full'>
    
       
     </div>
     </div>
   );
}

