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
        { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?", files: [] },
        { id: 2, active: false, placeholder: "", showUser: false, content: "", files: [] }
    ]);
    const [isPublishEnabled, setIsPublishEnabled] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/pagina1");
        }
    }, [user, router]);

    const handleInput = (index, event) => {
        const newThreads = [...threads];
        newThreads[index].content = event.target.value;
        if (index < newThreads.length - 1) {
            newThreads[index + 1].active = true;
        } else {
            newThreads.push({ id: newThreads.length + 1, active: true, placeholder: "" });
        }
        setThreads(newThreads);
        const hasContent = newThreads.some(thread => thread.content.trim() !== "");
        setIsPublishEnabled(hasContent);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handleAddThread = (index) => {
        const newThreads = [...threads];
        newThreads[index].active = true;
        newThreads[index].showUser = true;
        newThreads[index].placeholder = "¿Di algo más?";
        newThreads[index].showButtons = true;
        newThreads[index].content = "";
        newThreads[index].files = [];
        setThreads(newThreads);
    };

    const handleRemoveThread = (index) => {
        const newThreads = [...threads];
        if (index === 1) {
            newThreads[index] = { id: 2, active: false, placeholder: " ", showUser: false, content: "" };
        } else {
            newThreads.splice(index, 1);
            if (newThreads.length > 1) {
                newThreads[newThreads.length - 1].placeholder = "";
            }
        }
        setThreads(newThreads);
    };

    const handlePublish = () => {
        const content = threads.map(thread => thread.content).join('\n');
        onPublish({content, threads});
    };

    const handleFileSelection = (files, threadIndex) => {
        const updatedThreads = [...threads];
        const currentThread = updatedThreads[threadIndex];

        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                const preview = URL.createObjectURL(file);
                currentThread.files.push({ type: "image", preview, name: file.name });
            } else if (file.type.startsWith("video/")) {
                const preview = URL.createObjectURL(file);
                currentThread.files.push({ type: "video", preview, name: file.name });
            } else {
                currentThread.files.push({ type: "file", name: file.name });
            }
        });

        setThreads(updatedThreads);
    };

    const handleButtonClick = (buttonId, threadIndex) => {
        if (buttonId === "attachFiles") {
            const inputElement = document.createElement("input");
            inputElement.type = "file";
            inputElement.multiple = true;
            inputElement.onchange = (e) => handleFileSelection(e.target.files, threadIndex);
            inputElement.click();
        }
    };

    const handleRemoveFile = (threadIndex, fileIndex) => {
        const updatedThreads = [...threads];
        updatedThreads[threadIndex].files.splice(fileIndex, 1);
        setThreads(updatedThreads);
    };

    if (!user) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
                onClick={e => e.stopPropagation()}>
                {/* ... (resto del código del modal) ... */}
                {threads.map((thread, index) => (
                    <section key={thread.id} className={`flex-1 ${thread.active ? '' : 'opacity-50 pointer-events-none'}`}>
                        {/* ... (resto del código del hilo) ... */}
                        {thread.active && (
                            <textarea
                                className="w-full border-l-2 ml-3 pl-6 -pt-0.5 -mt-4 outline-none focus:ring-0"
                                type="text"
                                placeholder={thread.placeholder}
                                rows="1"
                                value={thread.content}
                                onInput={(e) => handleInput(index, e)}
                                style={{ overflow: 'hidden', resize: 'none' }}
                            ></textarea>
                        )}
                        <div className="preview-container">
                            {thread.files.map((file, fileIndex) => (
                                <div key={fileIndex} className="my-2 relative">
                                    {file.type === "image" && (
                                        <img src={file.preview} alt={file.name} className="w-full rounded-md" />
                                    )}
                                    {file.type === "video" && (
                                        <video src={file.preview} className="w-full rounded-md" controls />
                                    )}
                                    {file.type === "file" && (
                                        <p className="text-gray-500">Archivo adjunto: {file.name}</p>
                                    )}
                                    <button
                                        className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
                                        onClick={() => handleRemoveFile(index, fileIndex)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        {(index === 0 || thread.showButtons) && <ModalButtons onButtonClick={handleButtonClick} threadIndex={index} />}
                    </section>
                ))}
                <section className="flex justify-between items-center pt-4">
                    {/* ... (resto del código de la sección de publicación) ... */}
                </section>
            </div>
        </div>
    );
};

export default Modal;