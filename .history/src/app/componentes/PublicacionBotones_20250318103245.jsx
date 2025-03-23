import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";

const PublicacionBotones = ({ onEdit, onDelete, onShare, onSave }) => {
  return (
    <div className="flex gap-4 mt-2">
      <button>
        <IoHeartOutline />
      </button>
      <button>
        <FaRegComment />
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={onShare}
      >
        Compartir
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={onSave}
      >
        Guardar
      </button>
    </div>
  );
};

export default PublicacionBotones;
