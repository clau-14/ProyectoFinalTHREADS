"use client"
import { useEffect } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';





const Header = ({ handleOpenModal }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      re
        router.push("/pagina1");
    }
    
  }, [user, router]);
   
  if (!user) {
    return null; // No renderizar el modal si el usuario no está disponible
  }
  return (
   <header className=' relative w-full h-screen  '>
    <article className='  inline-flex border-b-2   w-full items-center justify-center gap-36 -my-72 py-6 mt-1 '>
      <img className='rounded-full w-12' src={user ? user.photoURL  : null} alt="" /> 
      <h1 className=' text-slate-400 -ml-28'>¿Que novedases tienes?</h1>
      <button  onClick={handleOpenModal} className='border rounded-lg px-5 py-2 font-bold' >Publicar</button>
      </article>
      

   </header>

  );
};

export default Header;
