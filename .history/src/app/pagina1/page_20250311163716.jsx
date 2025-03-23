"use client"
import Contenido from '@/app/componentes/Contenido';
import Videoplayer from '../componentes/Videoplayer';
import Youtube from '../componentes/Youtube';
import Menu from '../componentes/Menu';
import Header from '../componentes/Header';
import Modal from '../componentes/Modal';
import { useState, useEffect } from 'react'; 
import { AiOutlineDown } from "react-icons/ai"; 
import { BiPlus } from "react-icons/bi"; 
import useUserStore from '@/store/userstore';


export default function ContenidoPage() {
   const [showModal, setShowModal] = useState(false); // mostrar o no el modal
   const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado
   const user = useUserStore((state) => state.user);

   //cargar contenido publicado
   useEffect(() => {
     const storedContent = JSON.parse(localStorage.getItem('publishedContent')) || [];
     setPublishedContent(storedContent);
   }, []);

   // Guardar contenido en localStorage cada vez que se actualice
   useEffect(() => {
     localStorage.setItem('publishedContent', JSON.stringify(publishedContent));
   }, [publishedContent]);

   useEffect(() => {
     const userState = useUserStore.getState();
     userState.syncUserFromLocalStorage();
     console.log("Usuario sincronizado:", userState.user);
   }, []);

   const handleOpenModal = () => {
     setShowModal(true);
   };
  
   const handleCloseModal = () => {
     setShowModal(false);
   };

   const handlePublishContent = (content) => {
    if (user && user.displayName && user.photoURL) {
      const newPost = {
        content: content.map(item => ({
          text: item.text,
          files: item.files
        })),
        userName: user.displayName,
        userPhoto: user.photoURL
      };
      setPublishedContent([...publishedContent, newPost]);
      setShowModal(false);
    } else {
      console.error("Datos del usuario no disponibles.");
    }
  };
  
  
   return (
     <div className='relative w-full h-screen'>
       <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal}/></section>
       <div className='flex flex-col items-center justify-center h-full'>
         <section>
           <button className='absolute top-5 flex font-bold text-sm'>Para ti <span className='ml-3 bg-white border rounded-full p-1'>< AiOutlineDown /></span></button>
         </section>
         <section style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
           className='container bg-white  flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32'>
           <Header handleOpenModal={handleOpenModal}/>
           <div className="absolute max-h-full top-52">
           {publishedContent.map((post, index) => (
              <div key={index} className="published-content flex items-center gap-4 -mb-6 pb-10">
              {/* Mostrar la foto de usuario */}
              <img
              className='rounded-full w-10 ml-12 mt-2 z-40'
              src={post.userPhoto || ""} // Mostrar un placeholder si no hay foto
              alt="Foto de usuario"/>

              {/* Mostrar el nombre del usuario */}
                <h1>{post.userName || ""}</h1>
                
              {/* Mostrar el contenido publicado */}
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                


              </div>
               
              
              ))}
              
             <Contenido />
             <Youtube/>
             <Contenido />
             <Youtube/>
             <Videoplayer/>
             <Contenido />
             <Youtube/>
           </div>
         </section>
       </div>
       <button className='absolute right-12 bottom-5 bg-white rounded-xl border-2 p-7 shadow-lg text-2xl font-bold' onClick={handleOpenModal}><BiPlus/></button>
       {showModal && (
         <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent} />
       )}
     </div>
   );
}