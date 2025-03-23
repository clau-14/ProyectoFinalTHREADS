import { RiFileCopy2Line } from "react-icons/ri"; 
import { CiMenuKebab } from "react-icons/ci"; 
import { useEffect, useState } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';

const Modal = ({ show, onClose }) => {
  if (!show) return null;
  const { user } = useUserStore();
  const router = useRouter();
  const [threads, setThreads] = useState([{ id: 1, active: true }]);

  useEffect(() => {
    if (!user) {
        router.push("/pagina1");
    }
  }, [user, router]);

  const handleInput = (index) => {
    const newThreads = [...threads];
    if (index < newThreads.length - 1) {
      newThreads[index + 1].active = true;
    } else {
      newThreads.push({ id: newThreads.length + 1, active: true });
    }
    setThreads(newThreads);
  };

  const handleRemoveThread = (index) => {
    const newThreads = threads.filter((_, i) => i !== index);
    setThreads(newThreads);
  };

  if (!user) {
    return null; // No renderizar el modal si el usuario no está disponible
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onClick={e => e.stopPropagation()}>
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button className="" onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center flex-1">Nuevo hilo</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>
        {threads.map((thread, index) => (
          <section key={thread.id} className={`flex-1 ${thread.active ? '' : 'opacity-50 pointer-events-none'}`}>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-4 -mb-6 pb-10">
                <img className='rounded-full w-10 -ml-2 mt-2 z-40' src={user ? user.photoURL : null} alt="" />
                
              </label>
              <button className="ml-0 text-sm" onClick={() => handleRemoveThread(index)}>X</button>
            </div>
            <textarea
              className="w-full border-l-2 ml-3 pl-6 -pt-0.5 -mt-4 outline-none focus:ring-0"
              type="text"
              placeholder="¿Di algo mas?"
              rows="1"
              onInput={() => handleInput(index)}
              style={{ overflow: 'hidden', resize: 'none' }}
            ></textarea>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Modal;