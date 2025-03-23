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

  // Estado inicial
  const [threads, setThreads] = useState([
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
  ]);

  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  // Redirige si el usuario no está logueado
  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  // Función para manejar el input
  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value.trim();

    // Activa un nuevo hilo al escribir en el último
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

    // Activa el botón Publicar si hay contenido
    const hasContent = newThreads.some((thread) => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);

    // Ajusta la altura del textarea
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  // Función para agregar un hilo manualmente
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

  // Función para eliminar un hilo
  const handleRemoveThread = (index) => {
    const newThreads = threads.filter((_, i) => i !== index);
    setThreads(newThreads);
  };

  // Función para publicar
  const handlePublish = () => {
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
          <section key={thread.id} className="flex flex-col">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-4">
                <img className="rounded-full w-12 h-12" src={user ? user.photoURL : ""} alt="" />
                {index === 0 || thread.showUser ? <h1>{user ? user.displayName : "Usuario"}</h1> : null}
              </label>
              {index !== 0 && (
                <button className="text-sm" onClick={() => handleRemoveThread(index)}>X</button>
              )}
            </div>
            <textarea
              className="w-full border-l-2 ml-3 pl-6 outline-none focus:ring-0 resize-none"
              placeholder={thread.placeholder}
              value={thread.content}
              onInput={(e) => handleInput(index, e)}
              rows="1"
              style={{ overflow: "hidden" }}
            ></textarea>
            <ModalButtons onButtonClick={(buttonId) => console.log(`Botón: ${buttonId}`)} />
          </section>
        ))}
        {/* Botón para agregar manualmente */}
        <section className="mt-4">
          <button
            className="mt-4 text-sm bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleAddThread}
          >
            Agregar un hilo
          </button>
        </section>
        <section className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-400">Cualquiera puede responder o citar</span>
          <button
            className={`px-4 py-2 rounded-lg ${isPublishEnabled ? "text-black font-bold" : "text-gray-400"}`}
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

            
            
             


