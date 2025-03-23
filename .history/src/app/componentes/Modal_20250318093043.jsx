"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import ModalButtons from "../componentes/ModalBotones";

const Modal = ({ show, onClose, onPublish, editingPost  }) => {
  if (!show) return null;

  const { user } = useUserStore();
  const router = useRouter();

  const [threads, setThreads] = useState([
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
    { id: 2, active: false, placeholder: "", showUser: false, content:"", files: [] } // segundo hilo inactivo
  ]);

  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);
   // Pre-rellenar el contenido del modal si estamos editando una publicación
  useEffect(() => {
    if (editingPost) {
      const updatedThreads = editingPost.content.map((item, index) => ({
        id: index + 1,
        active: true,
        placeholder: index === 0 ? "¿Qué novedades tienes hoy?" : "¿Di algo más?",
        content: item.text || "",
        files: item.files || [],
      }));
      setThreads(updatedThreads);
    } else {
      // Si no se edita nada, inicializa con un hilo vacío
      setThreads([
        {
          id: 1,
          active: true,
          placeholder: "¿Qué novedades tienes hoy?",
          content: "",
          files: [],
        },
      ]);
    }
  }, [editingPost]);

  // Maneja el texto ingresado en el hilo y agrega automáticamente un nuevo hilo al escribir en el último
  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value; 
    if (index < newThreads.length - 1) {
      newThreads[index + 1].active = true; // activa 2do hilo si existe
    } else {
      newThreads.push({ id: newThreads.length + 1, active: true, placeholder: "", content: "", files: [] });
    }

    setThreads(newThreads);
    

    // Activa el botón "Publicar" si algún hilo tiene contenido
    const hasContent = newThreads.some((thread) => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);

    // Ajusta automáticamente la altura del textarea
    event.target.style.height = "auto";
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



  const handlePublish = () => {
    const content = threads.map((thread) => ({
      text: thread.content,
      files: thread.files
    }));
    console.log("Contenido y archivos publicados:", content); // Para depuración
    onPublish(content);
  };
  
  if (!user) {
    return null; // No renderizar el modal si el usuario no está disponible
  }


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

