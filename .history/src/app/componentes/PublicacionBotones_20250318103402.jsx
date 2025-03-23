import { BiRepost } from "react-icons/bi"; 
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
      <button>
      <BiRepost />
      </button>
      <button>
        
      </button>
    </div>
  );
};

export default PublicacionBotones;
