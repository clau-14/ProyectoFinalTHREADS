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
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] }, // Primer hilo
    { id: 2, active: false, placeholder: "", showUser: false, content: "", files: [] }, // Segundo hilo inactivo
  ]);
  const [isPublishEnabled, setIsPublishEnabled] = useState(false); // Estado para habilitar el botón de Publicar

  // Redirige si no hay usuario
  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  // Manejo del contenido ingresado
  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;
    setThreads(newThreads);

    // Habilitar botón de Publicar si hay contenido
    setIsPublishEnabled(newThreads.some((thread) => thread.content.trim() !== ""));
  };

  // Agregar un nuevo hilo
  const handleAddThread = (index) => {
    const newThreads = [...threads];
    newThreads[index].active = true;
    newThreads[index].showUser = true;
    newThreads[index].placeholder = "¿Di algo más?";
    setThreads(newThreads);
  };

  // Eliminar un hilo
  const handleRemoveThread = (index) => {
    const newThreads = [...threads];
    newThreads[index] = { ...newThreads[index], active: false, content: "" };
    setThreads(newThreads);
  };

  // Publicar el contenido
  const handlePublish = () => {
    const content = threads.map((thread) => thread.content).join("\n");
    onPublish(content);
  };

  // Renderizado del modal
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <section className="border-b-2 pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold">Nuevo hilo</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl">
                <RiFileCopy2Line />
              </button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold">
                <CiMenuKebab />
              </button>
            </div>
          </div>
        </section>

        {threads.map((thread, index) => (
          <section key={thread.id} className={`flex-1 ${thread.active ? "" : "opacity-50 pointer-events-none"}`}>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-4">
                <img className="rounded-full w-12 h-12" src={user?.photoURL} alt="" />
                <h1>{user?.displayName || "Usuario"}</h1>
              </label>
              {index !== 0 && (
                <button className="text-sm" onClick={() => handleRemoveThread(index)}>
                  X
                </button>
              )}
            </div>

            <textarea
              className="w-full border-l-2 ml-3 pl-6 outline-none"
              placeholder={thread.placeholder}
              rows="1"
              value={thread.content}
              onChange={(e) => handleInput(index, e)}
              style={{ overflow: "hidden", resize: "none" }}
            ></textarea>
          </section>
        ))}

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

    
 

