"use client"
import { RiFileCopy2Line } from "react-icons/ri"; 
import { CiMenuKebab } from "react-icons/ci"; 
import { useEffect, useState } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';
import ModalButtons from '../componentes/ModalBotones'


const Modal = ({ show, onClose, onPublish }) => {
  if (!show) return null;
  const { user } = useUserStore();
  const router = useRouter();
  const [threads, setThreads] = useState([
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", files: [] }, //primer hilo
    { id: 2, active: false, placeholder: "", showUser: false, content:"", files: [] } // segundo hilo inactivo
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Estado para archivos seleccionados
  const [isPublishEnabled, setIsPublishEnabled] = useState(false); // Estado para habilitar el botón de "Publicar"

  useEffect(() => {
    if (!user) {
        router.push("/pagina1");
    }
  }, [user, router]);

  const handleInput = (index) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value; 
    if (index < newThreads.length - 1) {
      newThreads[index + 1].active = true; // activa 2do hilo si existe
    } else {
      newThreads.push({ id: newThreads.length + 1, active: true, placeholder: "" });
    }
    setThreads(newThreads);
     // Habilita el botón de "Publicar" si hay contenido en alguno de los hilos
  const hasContent = newThreads.some(thread => thread.content.trim() !== "");
  setIsPublishEnabled(hasContent);
  
  // Ajusta la altura del textarea automáticamente
  event.target.style.height = 'auto';
  event.target.style.height = `${event.target.scrollHeight}px`;
};


  const handleAddThread = (index) => {
    const newThreads = [...threads];
    newThreads[index].active = true; // activa el hilo correspondiente
    newThreads[index].showUser = true;// muestra el nombre de usuario
    newThreads[index].placeholder = "¿Di algo más?" ;
    newThreads[index].showButtons = true; 
    newThreads[index].content = ""; 
    newThreads[index].files = [];
     
    setThreads(newThreads);
  };

  const handleRemoveThread = (index) => {
    const newThreads = [...threads];
    if (index === 1) {
      newThreads[index] = { id: 2, active: false, placeholder: " ", showUser: false, content: ""}; // Desactiva y borra el contenido del segundo hilo
    } else {
      newThreads.splice(index, 1); // Elimina el hilo específico
      if (newThreads.length > 1) {
        newThreads[newThreads.length - 1].placeholder = "";
      }
          }
    setThreads(newThreads);
  };

  const handlePublish = () => {
    //  para publicar el contenido
    const content = threads.map(thread => thread.content).join('\n');
    onPublish(content);
  };

  const handleFileSelection = (files, threadIndex) => {
    const updatedThreads = [...threads];
    const currentThread = updatedThreads[threadIndex];
  
    // Asegúrate de que la propiedad 'files' existe como un array
    if (!currentThread.files) {
      currentThread.files = [];
    }
  
    Array.from(files).forEach((file) => {
      if (!currentThread.files.some((f) => f.name === file.name)) {
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          currentThread.files.push({ type: "image", preview, name: file.name });
        } else if (file.type.startsWith("video/")) {
          const preview = URL.createObjectURL(file);
          currentThread.files.push({ type: "video", preview, name: file.name });
        } else {
          currentThread.files.push({ type: "file", name: file.name });
        }
      }
    });
  
    setThreads(updatedThreads);
  };
  
  
   
  const handleButtonClick = (buttonId, threadIndex) => {
    if (buttonId === "attachFiles") {
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.multiple = true; // Permitir selección múltiple
      inputElement.onchange = (e) => handleFileSelection(e.target.files, threadIndex);
      inputElement.click();
    }
  };



  if (!user) {
    return null; // No renderizar el modal si el usuario no está disponible
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onClick={e => e.stopPropagation()}>
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button className="" onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center flex-1">Nuevo hilo</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>
       
        
         <section className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Cualquiera puede responder o citar</span>
          </div>
          <button
            className={`px-4 py-2 rounded-lg ${isPublishEnabled ? ' text-black border-2 border-gray-200 rounded-lg font-bold' : 'text-grey-300 border-2 text-gray-400 '}`}
            onClick={handlePublish}
            disabled={!isPublishEnabled}
          >
            Publicar
          </button>
        </section>
      </div>
    </div>
  );
};


export default Modal;