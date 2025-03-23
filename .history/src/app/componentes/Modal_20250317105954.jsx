"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import ModalButtons from "../componentes/ModalBotones";

const Modal = ({ show, onClose, onPublish, defaultValue }) => {
  if (!show) return null;
  const { user } = useUserStore();
  const router = useRouter();

  const [threads, setThreads] = useState([]);
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  // Inicializar los hilos con defaultValue o configuración inicial
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      const initialThreads = defaultValue.map((item, index) => ({
        id: index + 1,
        active: true,
        placeholder: index === 0 ? "¿Qué novedades tienes hoy?" : "¿Di algo más?",
        content: item.text,
        files: item.files || [],
      }));
      setThreads(initialThreads);
    } else {
      setThreads([
        { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
        { id: 2, active: false, placeholder: "", content: "", files: [] },
      ]);
    }
  }, [defaultValue]);

  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;

    setThreads(newThreads);

    const hasContent = newThreads.some((thread) => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleFileSelection = (files, threadIndex) => {
    const updatedThreads = [...threads];
    const currentThread = updatedThreads[threadIndex];

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
        }
      }
    });

    setThreads(updatedThreads);
  };

  const handlePublish = () => {
    const updatedContent = threads.map((thread) => ({
      text: thread.content,
      files: thread.files,
    }));
    console.log("Contenido y archivos publicados/modificados:", updatedContent);
    onPublish(updatedContent);
  };

  if (!user) {
    return null;
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
        {threads.map((thread, index) => (
          <section key={thread.id} className={`flex-1 ${thread.active ? "" : "opacity-50 pointer-events-none"}`}>
            <textarea
              className="w-full border-l-2 ml-3 pl-6 outline-none focus:ring-0 resize-none"
              placeholder={thread.placeholder}
              value={thread.content}
              onInput={(e) => handleInput(index, e)}
              rows="1"
              style={{ overflow: "hidden" }}
            ></textarea>
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

