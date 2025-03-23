
"use client";
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
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?" }
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
        router.push("/pagina1");
    }
  }, [user, router]);

  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;

    const hasContent = newThreads.some(thread => thread.content?.trim() !== "" || selectedFiles.length > 0);
    setIsPublishEnabled(hasContent);

    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    setThreads(newThreads);
  };

  const handleFileInput = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files));
    setIsPublishEnabled(files.length > 0);
  };

  const handlePublish = () => {
    const content = threads.map(thread => thread.content).join('\n');
    const filesData = selectedFiles.map(file => file.name).join(', ');
    onPublish(`Contenido:\n${content}\nArchivos: ${filesData}`);
    setSelectedFiles([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center flex-1">Nuevo hilo</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>
        {threads.map((thread, index) => (
          <section key={thread.id}>
            <textarea
              className="w-full border-l-2 pl-6 outline-none focus:ring-0"
              placeholder={thread.placeholder}
              rows="1"
              value={thread.content || ""}
              onInput={(e) => handleInput(index, e)}
              style={{ overflow: 'hidden', resize: 'none' }}
            ></textarea>
          </section>
        ))}
        <section className="mt-4">
          <input type="file" multiple onChange={handleFileInput} />
          {selectedFiles.length > 0 && (
            <div>
              <h3>Vista previa:</h3>
              {selectedFiles.map((file, idx) => (
                <div key={idx}>{file.name}</div>
              ))}
            </div>
          )}
        </section>
        <section className="pt-4">
          <button
            onClick={handlePublish}
            disabled={!isPublishEnabled}
            className={`${isPublishEnabled ? 'text-black font-bold' : 'text-gray-400'}`}
          >
            Publicar
          </button>
        </section>
      </div>
    </div>
  );
};

export default Modal;

