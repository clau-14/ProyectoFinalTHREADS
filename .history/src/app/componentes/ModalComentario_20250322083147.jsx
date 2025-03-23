"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import ModalButtons from "../componentes/ModalBotones";

const ModalComentario = ({ show, onClose, onPublish, publication, editingPost }) => {
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
      setThreads([
        { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
      ]);
    }
  }, [editingPost]);

  const resetThreads = () => {
    // Reinicia el estado de los hilos al cerrar el modal
    setThreads([{ id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] }]);
    setIsPublishEnabled(false);
  };

  const handleClose = () => {
    resetThreads(); // Reinicia el estado
    onClose(); // Llama la función para cerrar el modal
  };

  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;
    if (index < newThreads.length - 1) {
      newThreads[index + 1].active = true;
    } else {
      newThreads.push({ id: newThreads.length + 1, active: true, placeholder: "", content: "", files: [] });
    }

    setThreads(newThreads);
    setIsPublishEnabled(newThreads.some((thread) => thread.content.trim() !== ""));
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handlePublish = () => {
    const content = threads.map((thread) => ({
      text: thread.content,
      files: thread.files,
    }));
    console.log("Contenido y archivos publicados:", content);
    onPublish(content); // Publica el contenido
    handleClose(); // Cierra el modal después de publicar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={handleClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center">Respuesta</h2>
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

        {/* Mostrar contenido de la publicación */}
        <section className="mt-4 mb-6">
          {publication?.photoURL && (
            <img
              src={publication.photoURL}
              alt="Imagen de la publicación"
              className="w-full rounded-md mb-4"
            />
          )}
          {publication?.text && <p className="text-gray-700">{publication.text}</p>}
        </section>

        {/* Hilos */}
        {threads.map((thread, index) => (
          <div key={thread.id} className="mb-4">
            <textarea
              className="w-full border rounded-md p-2 resize-none"
              placeholder={thread.placeholder}
              value={thread.content}
              onInput={(e) => handleInput(index, e)}
              rows="2"
            ></textarea>
          </div>
        ))}

        <button
          onClick={() => handleAddThread(threads.length)}
          className="text-blue-500 underline mb-4"
        >
          Agregar hilo
        </button>

        {/* Botones de acción */}
        <section className="flex justify-between items-center pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md bg-gray-300"
          >
            Cerrar
          </button>
          <button
            onClick={handlePublish}
            disabled={!isPublishEnabled}
            className={`px-4 py-2 rounded-md ${
              isPublishEnabled ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-400"
            }`}
          >
            Publicar
          </button>
        </section>
      </div>
    </div>
  );
};

export default ModalComentario;
