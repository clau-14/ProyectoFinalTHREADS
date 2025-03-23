"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import ModalButtons from "../componentes/ModalBotones";

const Modal = ({ show, onClose, onPublish, onEdit, isEditing, existingContent }) => {
  if (!show) return null;

  const { user } = useUserStore();
  const router = useRouter();

  const [threads, setThreads] = useState(existingContent || [
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", content: "", files: [] },
    { id: 2, active: false, placeholder: "", showUser: false, content:"", files: [] }
  ]);

  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  useEffect(() => {
    if (existingContent) {
      setThreads(existingContent);
    }
  }, [existingContent]);

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
  };

  const handlePublishOrEdit = () => {
    const content = threads.map((thread) => ({
      text: thread.content,
      files: thread.files
    }));
    if (isEditing) {
      onEdit(content);
    } else {
      onPublish(content);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center">{isEditing ? "Editar publicación" : "Nuevo hilo"}</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>
        {threads.map((thread, index) => (
          <section key={thread.id} className={`flex-1 ${thread.active ? "" : "opacity-50 pointer-events-none"}`}>
            <label className="flex items-center gap-4 -mb-6 pb-10">
              <img className='rounded-full w-12 h-12' src={user ? user.photoURL : null} alt="" />
              {index === 0 || thread.showUser ? <h1>{user ? user.displayName : null}</h1> : null}
            </label>
            <textarea
              className="w-full border-l-2 ml-3 pl-6 outline-none resize-none"
              placeholder={thread.placeholder}
              value={thread.content}
              onInput={(e) => handleInput(index, e)}
            ></textarea>
            <ModalButtons onButtonClick={(buttonId) => console.log(buttonId, index)} />
          </section>
        ))}
        <section className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-400">Cualquiera puede responder o citar</span>
          <button
            className={`px-4 py-2 rounded-lg ${isPublishEnabled ? "text-black font-bold" : "text-gray-400"}`}
            onClick={handlePublishOrEdit}
            disabled={!isPublishEnabled}
          >
            {isEditing ? "Guardar cambios" : "Publicar"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Modal;

