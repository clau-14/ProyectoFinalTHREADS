
"use client"
import Contenido from '@/app/componentes/Contenido';
import Videoplayer from '../componentes/Videoplayer';
import Youtube from '../componentes/Youtube';
import Menu from '../componentes/Menu';
import Header from '../componentes/Header';
import Modal from '../componentes/Modal';
import { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai"; 
import { BiPlus } from "react-icons/bi"; 
import useUserStore from '@/store/userstore';


 



export default function ContenidoPage() {
   const [showModal, setShowModal] = useState(false); // mostrar o no el modal
   const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado
   
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const handlePublishContent = (content) => {
      setPublishedContent([...publishedContent, content]);
      setShowModal(false);
    };

  return (
  
    <div className=' relative w-full h-screen  ' >
    <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal}/></section>
   
   
    <div className='flex flex-col items-center justify-center h-full '> 
      <section> <button className='absolute top-5 flex font-bold text-sm'>Para ti <span className=' ml-3 bg-white border rounded-full p-1'>< AiOutlineDown /></span></button></section>
    <section style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
    className=' container  bg-white  flex flex-col items-center justify-center w-2/5 h-full gap-2  rounded-3xl fixed mt-32'>

       <Header handleOpenModal={handleOpenModal}/>
      <article className='absolute max-h-full top-52 '>
      {publishedContent.map((content, index) => (
              <div key={index} className="published-content">
                 <img className="rounded-full w-12" src={user.photoURL || ""} alt="" />
                <p>{content}</p>
              </div>
            ))}
      <Contenido />
      <Youtube/>
      <Contenido />
      <Youtube/>
      <Videoplayer/>
      <Contenido />
      <Youtube/>
     
     
      </article>
      
      </section>
      
    </div>
    <button className='absolute right-12 bottom-5 bg-white rounded-xl border-2 p-7 shadow-lg text-2xl font-bold' onClick={handleOpenModal} > <BiPlus /></button>
   
    {showModal && (
        <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent} />
      )}
    
      
    </div>
  
  );
};
