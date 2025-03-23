"use client";
import { useState } from 'react';
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
import Menu from '../componentes/Menu';
import { AiOutlineDown } from 'react-icons/ai';
import Modal from './Modal';
import Header from './Header';
import { SlNote } from 'react-icons/sl';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { AiOutlineInstagram } from 'react-icons/ai';




export default function Perfil() {
  const user = useUserStore((state) => state.user); // Obtener usuario desde userStore
   const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
    const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido 

    

     // Cargar contenido publicado
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
    setEditingPost(null);
  };

  const handlePublishContent = (content) => {
   if (editingPost !== null) {
     // Guardar cambios en la publicación editada
     const updatedPosts = [...publishedContent];
     updatedPosts[editingPost.index] = {
       ...updatedPosts[editingPost.index],
       content
     };
     setPublishedContent(updatedPosts);
   } else {
     // Crear nueva publicación
     if (user && user.displayName && user.photoURL) {
       const newPost = {
         content: content || [], // Asegurar que sea un array
         userName: user.displayName,
         userPhoto: user.photoURL
       };
       setPublishedContent([...publishedContent, newPost]);
     } else {
       console.error("Datos del usuario no disponibles.");
     }
   }

  return (
    <div className='relative w-full h-screen'>
    {/* Sección del menú */}
    <section className='absolute left-5 top-10'>
      <Menu />
      <Modal show={showModal}  onClose={handleCloseModal} onPublish={handlePublishContent} />
    </section>
    
    {/* Contenido principal */}
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <section>
        <button className='absolute top-5 flex font-bold text-sm'>
          Perfil
          <span className='ml-3 bg-white border rounded-full p-1'>
            <AiOutlineDown /> 
          </span>
        </button>
      </section>
      <section className='container bg-white flex-col items-center justify-center w-2/5 rounded-3xl h-screen fixed mt-16 -top-2'>
      <article className="relative w-full h-min-screen">  
      <div className=" inline-flex w-full items-center justify-center  -my-72 py-6 mt-1">
        <h1 className="text-slate-400 -ml-4">
        {user?.displayName || "Invitado"} {/* Mostrar el nombre del usuario */}
        </h1>
        <img className="rounded-full w-12 ml-72"  src={user?.photoURL || ""} alt="" /> {/* Mostrar la foto del usuario */}
        </div>
        <div className="flex justify-center gap-5 mt-10 -mb-5 ">
            <button className="" >Seguidores</button>
            <button className="ml-80 text-xl" ><CgNotes /></button>
            <button className="text-2xl"><AiOutlineInstagram /></button>
        </div>
        <div className="  flex justify-center">
        <button className="mb-5 border border-slate-200 rounded-lg px-60 py-1 mt-10 font-bold text-slate-4000000" >
          Editar Perfil
        </button>
        </div>
        <div className="flex justify-center border-b-2 w-full gap-36 mt-4 pb-1 text-slate-500 ">
          <button className=" hover:text-black focus:text-black focus:underline focus:decoration-[1.5px] focus:underline-offset-8 ">Hilo</button>
          <button className=" hover:text-black focus:text-black focus:underline focus:decoration-[1.5px] focus:underline-offset-8 " >Respuestas</button>
          <button className=" hover:text-black focus:text-black focus:underline focus:decoration-[1.5px] focus:underline-offset-8 " >Reposts</button>
        </div>
        <div className="flex justify-center items-center realtive "> 
          <Header  handleOpenModal={handleOpenModal}/>
          <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent} />
        </div> 
        <div className="flex justify-start gap-5 -mt-96">
        </div>
        <div className="flex flex-row  justify-center gap-2 p-5 -mt-52 text-xs">
          
  {/* Tarjeta 1 */}
  <div className="flex flex-col justify-center items-center bg-slate-100 border border-gray-200 shadow-lg rounded-lg h-60 max-w-xs ">
     <span className="bg-white rounded-full p-5 text-xl"> <SlNote /></span>
    <h2 className="font-bold text-sm text-gray-800 mt-4">Crear hilo</h2>
    <p className="text-gray-500 mt-2 text-center">
    Comparte qué piensas o un momento destacado reciente.
    </p>
    <button  className="mt-10 w-28 bg-black text-white py-2 rounded-lg transform transition-transform duration-300  hover:translate-y-1 "  onClick={handleOpenModal} >Crear</button>
  </div>

  {/* Tarjeta 2 */}
  <div className="flex flex-col justify-center items-center bg-slate-100 border border-gray-200 shadow-lg rounded-lg h-60 max-w-xs p-5">
  <span className="bg-white rounded-full p-5 text-xl"><AiOutlineTeam /></span>
    <h2 className="font-bold text-sm text-gray-800 mt-4">Seguir 10 perfiles</h2>
    <p className="text-gray-500 mt-2 text-center">
    Llena tu feed de hilos que te interesen.
    </p>
    <button  className="mt-10 w-28 bg-black text-white py-2 rounded-lg transform transition-transform duration-300  hover:translate-y-1">
      Ver perfiles
    </button>
  </div>

  {/* Tarjeta 3 */}
  <div className="flex flex-col justify-center items-center bg-slate-100 border border-gray-200 shadow-lg rounded-lg h-60 max-w-xs p-5">
    <span className="bg-white rounded-full p-5 text-xl"><BiPencil /></span>
    <h2 className="font-bold text-sm text-gray-800 mt-4">Agregar presentación</h2>
    <p className="text-gray-500 mt-2 text-center">
    Preséntate y cuenta a los demás qué te gusta.
    </p>
    <button className="mt-10 w-28 bg-black text-white py-2 rounded-lg transform transition-transform duration-300  hover:translate-y-1 ">
      Agregar
    </button>
  </div>
 
  </div> 
    </article>
      </section>
    </div>
  </div>
 );
}


  
