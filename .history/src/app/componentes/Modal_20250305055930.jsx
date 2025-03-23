import { RiFileCopy2Line } from "react-icons/ri"; 
import { CiMenuKebab } from "react-icons/ci"; 
import { useEffect } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';



const Modal = ({ show, onClose }) => {
  if (!show) return null;
  const { user } = useUserStore();
  const router = useRouter();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!user) {
        router.push("/pagina1");
    }
    
  }, [user, router]);
  
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
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
    <section></section>
    <label className="flex items-center gap-4 -mb-4 "><img className='rounded-full w-10 mt-2' src={user ? user.photoURL  : null} alt="" /> <h1 className=""> {user ? user.displayName : null}</h1></label>
    <textarea ref={textareaRef} className="w-full border-l-4 pl-3 outline-none focus:ring-0 
     " type="text" placeholder="¿Que novedases tienes?" rows="1"
     onInput={handleInput} style={{ overflow: 'hidden', resize: 'none' }}></textarea>
  </div>
</div>
  );
};

export default Modal;
