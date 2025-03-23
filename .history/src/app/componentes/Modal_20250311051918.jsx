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
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?",content: "", files: []}, //primer hilo
    { id: 2, active: false, placeholder: "", showUser: false, content:"", files: []} // segundo hilo inactivo
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Estado para archivos seleccionados
  const [isPublishEnabled, setIsPublishEnabled] = useState(false); // Estado para habilitar el botón de "Publicar"
  

  useEffect(() => {
    if (!user) {
        router.push("/pagina1");
    }
  }, [user, router]);

  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;
    setThreads(newThreads);
  
    // Habilita el botón de "Publicar" si hay contenido en alguno de los hilos
    const hasContent = newThreads.some(thread => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);
  };
  
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
  
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const preview = file.type.startsWith('image/')
          ? `<img src="${URL.createObjectURL(file)}" alt="${file.name}" class="w-full rounded-md my-2"/>`
          : `<video src="${URL.createObjectURL(file)}" controls class="w-full rounded-md my-2"></video>`;
        currentThread.content += `\n${preview}`; // Agrega la vista previa al contenido del hilo
      } else {
        currentThread.content += `\n[Archivo adjunto: ${file.name}]`;
      }
    });
  
    currentThread.files = [...currentThread.files, ...files]; // Guarda los archivos en el hilo correspondiente
    setThreads(updatedThreads);
  };
  
  
  
  const handleButtonClick = (buttonId, threadIndex) => {
  if (buttonId === 'attachFiles') {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.multiple = true;
    inputElement.onchange = (e) => handleFileSelection(e.target.files, threadIndex);
    inputElement.click();
  }
};

    
    // Aquí puedes agregar la lógica específica para cada botón
  


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
        {threads.map((thread, index) => (
  <section
    key={thread.id}
    className={`flex-1 ${thread.active ? '' : 'opacity-50 pointer-events-none'}`}
  >
    <div className="flex justify-between items-center">
      <label className="flex items-center gap-4 -mb-6 pb-10">
        <img
          className="rounded-full flex items-center gap-4 mb-2 pb-100 -ml-2 mt-2 z-10 w-12 h-12"
          src={user ? user.photoURL : null}
          alt=""
        />
        {index === 0 || thread.showUser ? (
          <h1>{user ? user.displayName : null}</h1>
        ) : (
          <button
            className="ml-0 text-sm text-gray-400"
            onClick={() => handleAddThread(index)}
          >
            Agregar un hilo
          </button>
        )}
      </label>
      {index !== 0 && (
        <button
          className="ml-0 text-sm"
          onClick={() => handleRemoveThread(index)}
        >
          X
        </button>
      )}
    </div>

    {threads.map((thread, index) => (
  <section
    key={thread.id}
    className={`flex-1 ${thread.active ? '' : 'opacity-50 pointer-events-none'}`}
  >
    <div className="flex justify-between items-center">
      <label className="flex items-center gap-4 -mb-6 pb-10">
        <img
          className="rounded-full flex items-center gap-4 mb-2 pb-100 -ml-2 mt-2 z-10 w-12 h-12"
          src={user ? user.photoURL : null}
          alt=""
        />
        {index === 0 || thread.showUser ? (
          <h1>{user ? user.displayName : null}</h1>
        ) : (
          <button
            className="ml-0 text-sm text-gray-400"
            onClick={() => handleAddThread(index)}
          >
            Agregar un hilo
          </button>
        )}
      </label>
      {index !== 0 && (
        <button
          className="ml-0 text-sm"
          onClick={() => handleRemoveThread(index)}
        >
          X
        </button>
      )}
    </div>

    {/* Mostrar contenido previo del hilo */}
    <div className="content-container w-full border-l-2 ml-3 pl-6 -mt-4">
      {thread.files.map((file, fileIndex) => (
        <div key={fileIndex} className="my-2">
          {file.type.startsWith('image/') && (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full rounded-md"
            />
          )}
          {file.type.startsWith('video/') && (
            <video
              src={URL.createObjectURL(file)}
              className="w-full rounded-md"
              controls
            />
          )}
        </div>
      ))}
      <p>{thread.content}</p> {/* Mostrar el contenido de texto */}
    </div>

    {/* Área para agregar nuevo texto */}
    {thread.active && (
      <textarea
        className="w-full border-l-2 ml-3 pl-6 outline-none focus:ring-0"
        type="text"
        placeholder={thread.placeholder}
        rows="1"
        value={thread.content}
        onInput={(e) => handleInput(index, e)}
        style={{ overflow: 'hidden', resize: 'none' }}
      ></textarea>
    )}

    {(index === 0 || thread.showButtons) && (
      <ModalButtons onButtonClick={(buttonId) => handleButtonClick(buttonId, index)} />
    )}
  </section>
))}
  </section>
))}


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
    
 

