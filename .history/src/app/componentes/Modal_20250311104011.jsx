"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import ModalButtons from "../componentes/ModalBotones";

const Modal = ({ show, onClose, onPublish }) => {
  if (!show) return null;

  const { user } = useUserStore();
  const router = useRouter();

  const [threads, setThreads] = useState([
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
  ]);

  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  // Maneja el texto ingresado en el hilo y agrega automáticamente un nuevo hilo al escribir en el último
  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value.trim();

    // Si se está escribiendo en el último hilo activo, crea un nuevo hilo
    if (index === threads.length - 1 && event.target.value.trim() !== "") {
      newThreads.push({
        id: newThreads.length + 1,
        active: true,
        placeholder: "¿Di algo más?",
        content: "",
        files: []
      });
    }

    setThreads(newThreads);

    // Activa el botón "Publicar" si algún hilo tiene contenido
    const hasContent = newThreads.some((thread) => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);

    // Ajusta automáticamente la altura del textarea
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  // Maneja la adición de archivos al hilo
  const handleFileSelection = (files, threadIndex) => {
    const updatedThreads = [...threads];
    const currentThread = updatedThreads[threadIndex];

    // Asegúrate de que `files` exista
    if (!currentThread.files) {
      currentThread.files = [];
    }

    // Agrega los archivos al hilo con previsualización
    Array.from(files).forEach((file) => {
      if (!currentThread.files.some((f) => f.name === file.name)) {
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          currentThread.files.push({ type: "image", preview, name: file.name });
        } else if (file.type.startsWith("video/")) {
          const preview = URL.createObjectURL(file);
          currentThread.files.push({ type: "video", preview, name: file.name });
        }
      }
    });

    setThreads(updatedThreads);
  };

  // Elimina un archivo del hilo
  const handleRemoveFile = (threadIndex, fileIndex) => {
    const updatedThreads = [...threads];
    const currentThread = updatedThreads[threadIndex];
    currentThread.files.splice(fileIndex, 1); // Elimina el archivo
    setThreads(updatedThreads);
  };
  const handleRemoveThread = (index) => { 
    const newThreads = [...threads]; 
    if (index === 1) { newThreads[index] = { id: 2, active: false, placeholder: " ", showUser: false, content: ""}; // Desactiva y borra el contenido del segundo hilo 
    } else 
    { newThreads.splice(index, 1); // Elimina el hilo específico 
    if (newThreads.length > 1) { newThreads[newThreads.length - 1].placeholder = ""; 

    } 
  } setThreads(newThreads); };

  // Adjuntar archivos usando ModalButtons
  const handleButtonClick = (buttonId, threadIndex) => {
    if (buttonId === "attachFiles") {
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.multiple = true;
      inputElement.accept = "image/*,video/*";
      inputElement.onchange = (e) => {
        if (e.target.files) {
          handleFileSelection(e.target.files, threadIndex);
        }
      };
      inputElement.click();
    }
  };

  const handleAddThread = () => {
    const newThreads = [...threads];
    newThreads.push({
      id: newThreads.length + 1,
      active: true,
      placeholder: "¿Di algo más?",
      content: "",
      files: []
    });
    setThreads(newThreads);
  };

  const handlePublish = () => {
    // Recolecta el contenido para publicar
    const content = threads.map((thread) => thread.content).join("\n");
    onPublish(content);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center">Nuevo hilo</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>
        {threads.map((thread, index) => (
          <section key={thread.id} className={`flex-1 ${thread.active ? "" : "opacity-50 pointer-events-none"}`}>
            <div className="flex justify-between items-center">
            <label className="flex items-center gap-4 -mb-6 pb-10"> <img className='rounded-full flex items-center gap-4 mb-2 pb-100 -ml-2 mt-2 z-10 w-12 h-12' src={user ? user.photoURL : null} alt="" /> {index === 0 || thread.showUser ? ( <h1>{user ? user.displayName : null}</h1> ) : ( <button className="ml-0 text-sm text-gray-400" onClick={() => handleAddThread(index)}>Agregar un hilo</button> )} </label> {index !== 0 && ( <button className="ml-0 text-sm" onClick={() => handleRemoveThread(index)}>X</button> )} </div>
          
            {thread.active && (
              <>
                <textarea
                  className="w-full border-l-2 ml-3 pl-6 outline-none focus:ring-0 resize-none"
                  placeholder={thread.placeholder}
                  value={thread.content}
                  onInput={(e) => handleInput(index, e)}
                  rows="1"
                  style={{ overflow: "hidden" }}
                ></textarea>
                {/* Previsualización de archivos */}
                <div className="preview-container">
                  {thread.files?.map((file, fileIndex) => (
                    <div key={fileIndex} className="relative my-2">
                      {file.type === "image" && (
                        <img src={file.preview} alt={file.name} className="w-full rounded-md" />
                      )}
                      {file.type === "video" && (
                        <video src={file.preview} className="w-full rounded-md" controls />
                      )}
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveFile(index, fileIndex)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <ModalButtons onButtonClick={(buttonId) => handleButtonClick(buttonId, index)} />
              </>
            )}
          </section>
        ))}
        <section className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-400">Cualquiera puede responder o citar</span>
          <button
            className={`px-4 py-2 rounded-lg ${
              isPublishEnabled ? "text-black font-bold" : "text-gray-400"
            }`}
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

