"use client";
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
import { FaPen, FaPlus } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

export default function Perfil() {
  const user = useUserStore((state) => state.user); // Obtener usuario desde userStore

  return (
    <div className='relative w-full h-screen'>
    {/* Sección del menú */}
    <section className='absolute left-5 top-10'>
      <Menu />
    </section>
    
    {/* Contenido principal */}
    <div className='flex flex-col items-center justify-center h-full'>
      <section>
        <button className='absolute top-5 flex font-bold text-sm'>
          Actividad 
          <span className='ml-3 bg-white border rounded-full p-1'>
            <AiOutlineDown /> {/* Asegúrate que este ícono esté bien importado */}
          </span>
        </button>
      </section>
      <section 
        style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
        className='container bg-white flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32'
      >
        {/* Contenido  aquí */}
      </section>
    </div>
  </div>
 );
}


  
