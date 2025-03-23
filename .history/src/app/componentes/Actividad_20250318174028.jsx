"use client";
import Menu from '../componentes/Menu';
import { useState } from 'react';

  


export default function Actividad() {
   return (
    <div className='relative w-full h-screen'>
    <Toaster />
   <section className='absolute left-5 top-10'><Menu/></section>
   <div className='flex flex-col items-center justify-center h-full'>
     <section>
       <button className='absolute top-5 flex font-bold text-sm'>Actividad <span className='ml-3 bg-white border rounded-full p-1'><AiOutlineDown /></span></button>
     </section>
     <section style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
       className='container bg-white flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32'>
       
   
       </div>
     </section>
    </div>

        
    
       
   )  
    
   );
}

