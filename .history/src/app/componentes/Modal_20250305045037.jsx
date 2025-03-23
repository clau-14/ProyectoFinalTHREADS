import { RiFileCopy2Line } from "react-icons/ri"; 
import { CiMenuKebab } from "react-icons/ci"; 
// components/Modal.js


const Modal = ({ show, onClose }) => {
  if (!show) return null;
  ReferenceError: user is not defined
    at [project]/src/app/componentes/Header.jsx [app-client] (ecmascript) (http://localhost:3000/_next/static/chunks/src_f828ab._.js:680:5)
    at http://localhost:3000/_next/static/chunks/_d95469._.js:693:27
    at runModuleExecutionHooks (http://localhost:3000/_next/static/chunks/_d95469._.js:738:9)
    at instantiateModule (http://localhost:3000/_next/static/chunks/_d95469._.js:691:9)
    at getOrInstantiateModuleFromParent (http://localhost:3000/_next/static/chunks/_d95469._.js:624:12)
    at esmImport (http://localhost:3000/_next/static/chunks/_d95469._.js:142:20)
    at [project]/src/app/pagina1/page.jsx [app-client] (ecmascript) (http://localhost:3000/_next/static/chunks/src_f828ab._.js:766:143)
    at http://localhost:3000/_next/static/chunks/_d95469._.js:693:27
    at runModuleExecutionHooks (http://localhost:3000/_next/static/chunks/_d95469._.js:738:9)
    at instantiateModule (http://localhost:3000/_next/static/chunks/_d95469._.js:691:9)
    at getOrInstantiateModuleFromParent (http://localhost:3000/_next/static/chunks/_d95469._.js:624:12)
    at commonJsRequire (http://localhost:3000/_next/static/chunks/_d95469._.js:157:20)
    at requireModule (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:2676:29)
    at initializeModuleChunk (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3218:25)
    at resolveModuleChunk (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3187:43)
    at http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3527:24

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
    <p className="mb-4">Contenido del modal.</p>
  </div>
</div>
  );
};

export default Modal;
