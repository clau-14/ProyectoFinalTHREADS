"use client";
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
import toast, { Toaster } from 'react-hot-toast';
import PublicacionBotones from '../componentes/PublicacionBotones';
import { createPost } from "@/firebase/crud";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "@/firebase/firebaseConfig";





export default function ContenidoPage() {
   const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
   const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado
   const [menuIndex, setMenuIndex] = useState(null); // Controla el menú desplegable
   const user = useUserStore((state) => state.user);
   const [posts, setPosts] = useState([]);


   const handleAddPost = async (content, userId) => {
    try {
      await createPost(content, userId); // Guardar en Firebase
      const newPost = { content, userId, timestamp: new Date(), likes: [] };
      setPublishedContent([newPost, ...publishedContent]); // Actualizar el estado local
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };


  const fetchPosts = async () => {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  useEffect(() => {
    const loadPosts = async () => {
      const firebasePosts = await fetchPosts();
      setPublishedContent(firebasePosts);
    };
  
    loadPosts();
  }, []);
  
   // Cargar contenido publicado
   useEffect(() => {
    const loadPosts = async () => {
      const firebasePosts = await fetchPosts(); // Obtén las publicaciones desde Firebase
      setPublishedContent(firebasePosts); // Actualiza el estado con las publicaciones de Firebase
    };
  
    loadPosts();
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
    setShowModal(false);
    setEditingPost(null); // Limpiar el estado de edición
  };
  const handleEditPost = (index) => {
    const postToEdit = publishedContent[index]; // Obtener la publicación seleccionada
    setEditingPost({ ...postToEdit, index }); // Guardar la publicación y su índice
    setShowModal(true); // Abrir el modal
  };


const handleDeletePost = (index) => {
  // Eliminar la publicación seleccionada
  const updatedContent = publishedContent.filter((_, i) => i !== index);
  setPublishedContent(updatedContent);

  // Mostrar notificación tipo tostada
  toast.success("¡La publicación fue eliminada con éxito!", {
    position: "top-center", 
    autoClose: 3000,      
    hideProgressBar: false,
    closeOnClick: true,    
    pauseOnHover: true,   
    draggable: true,       
    progress: undefined,   
  });
};


   const toggleMenu = (index) => {
     setMenuIndex(menuIndex === index ? null : index);
   };

   const [editingPost, setEditingPost] = useState(null); // Estado para la publicación en edición


   return (
     <div className='relative w-full h-screen'>
        <Toaster />
       <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
       <div className='flex flex-col items-center justify-center h-full'>
         <section>
           <button className='absolute top-5 flex font-bold text-sm'>Para ti <span className='ml-3 bg-white border rounded-full p-1'><AiOutlineDown /></span></button>
         </section>
         <section style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
           className='container bg-white flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32'>
           <Header handleOpenModal={handleOpenModal} />
           <div className="absolute max-h-full top-32 flex-row">
             {publishedContent.map((post, index) => (
               <div key={index} className="published-content flex items-start mb-8 p-4 border-b  relative">
                 <img className="rounded-full w-12 h-12" src={post.userPhoto || ""} alt="Foto de usuario" />
                 <div className="ml-4">
                   <h1 className="font-bold">{post.userName || "Usuario"}</h1>
                   {post.content.map((item, i) => (
                     <div key={i} className="mt-2">
                       {/* Renderizar texto */}
                       {item.text && <p>{item.text}</p>}
                       {/* Renderizar imágenes */}
                       {item.files?.map((file, fileIndex) => (
                         <div key={fileIndex} className="mt-4">
                           {file.type === "image" && (
                             <img
                               className="w-full h-auto rounded-lg"
                               src={file.preview}
                               alt={file.name}
                             />
                           )}
                           {file.type === "video" && (
                             <video
                               className="w-full h-auto border rounded-lg mt-2"
                               src={file.preview}
                               controls
                             />
                           )}
                         </div>
                       ))}
                     </div>
                   ))}
                    <PublicacionBotones
                      onLike={() => console.log("Me gusta", index)}
                      onComment={() => console.log("Comentar", index)}
                      onRepost={() => console.log("Repostear", index)}
                      onShare={() => console.log("Compartir", index)}
                    />
                 </div>
                 {/* Menú desplegable */}
                 <div className="ml-auto relative">
                   <button
                     className="text-slate-600 font-bold"
                     onClick={() => toggleMenu(index)}
                   >
                     ...
                   </button>
                   {menuIndex === index && (
                     <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg text-left p-2 w-48">
                       <ul>
                          <li
                         className="hover:bg-gray-200 px-2 py-1 cursor-pointer"
                          onClick={() => handleEditPost(index)}
                        >
                          Editar publicación
                          </li>

                         <li 
                           className="hover:bg-gray-200 px-2 py-1 cursor-pointer"
                           onClick={() => handleDeletePost(index)}
                         >
                           Eliminar publicación
                         </li>
                       </ul>
                     </div>
                   )}
                 </div>
               </div>
             ))}
             <Contenido />
             <Youtube />
             <Contenido />
             <Youtube />
             <Videoplayer/>
             <Contenido />
             <Youtube />
           </div>
         </section>
       </div>
       <button className='absolute right-12 bottom-5 bg-white rounded-xl border-2 p-7 shadow-lg text-2xl font-bold' onClick={handleOpenModal}><BiPlus /></button>
       {showModal && (
         <Modal show={showModal} onClose={handleCloseModal} onPublish={handlePublishContent}  editingPost={editingPost}  onAddPost={handleAddPost} />
       )}
     </div>
   );
}
