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

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  // Inicializar threads con defaultValue
  useEffect(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      const mappedThreads = defaultValue.map((item, index) => ({
        id: index + 1,
        active: true,
        placeholder: index === 0 ? "¿Qué novedades tienes hoy?" : "¿Di algo más?",
        content: item.text || "",
        files: item.files || []
      }));
      setThreads(mappedThreads);
    } else {
      setThreads([
        { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
        { id: 2, active: false, placeholder: "", content: "", files: [] }
      ]);
    }
  }, [defaultValue]);

  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;
    setThreads(newThreads);

    // Activar el botón "Publicar" si algún hilo tiene contenido
    const hasContent = newThreads.some((thread) => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);
  };

  const handleFileSelection = (files, threadIndex) => {
    const updatedThreads = [...threads];
    const currentThread = updatedThreads[threadIndex];

    if (!currentThread.files) {
      currentThread.files = [];
    }

    Array.from(files).forEach((file) => {
      if (!currentThread.files.some((f) => f.name === file.name)) {
        const preview = URL.createObjectURL(file);
        const fileType = file.type.startsWith("image/") ? "image" : "video";
        currentThread.files.push({ type: fileType, preview, name: file.name });
      }
    });

    setThreads(updatedThreads);
  };

  const handlePublish = () => {
    const content = threads.map((thread) => ({
      text: thread.content,
      files: thread.files
    }));
    onPublish(content);
  };

  if (!user) return null; // No renderizar si no hay usuario

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center">Editar publicación</h2>
          </div>
        </section>
        {threads.map((thread, index) => (
          <section key={thread.id} className="mt-4">
            <textarea
              className="w-full border p-2 rounded-lg"
              placeholder={thread.placeholder}
              value={thread.content}
              onChange={(e) => handleInput(index, e)}
            />
          </section>
        ))}
        <button
          className={`mt-4 px-4 py-2 rounded-lg ${
            isPublishEnabled ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
          }`}
          onClick={handlePublish}
          disabled={!isPublishEnabled}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default Modal;
