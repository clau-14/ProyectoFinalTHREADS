import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";

const PublicacionBotones = ({  }) => {
  const [likes, setLikes] = useState(0); // Estado para contar los "Me gusta"

  const handleLike = () => {
    setLikes(likes + 1); // Incrementa el contador
  };

  return (
    <div className="flex gap-4 mt-3">
      <button
        onClick={handleLike}
        className="hover:text-red-500 transition-transform transform hover:scale-110"
        aria-label="Me gusta"
      >
        <IoHeartOutline />
      </button>
      <button
        onClick={onComment}
        className="hover:text-blue-500 transition-transform transform hover:scale-110"
        aria-label="Comentar"
      >
        <FaRegComment />
      </button>
      <button
        onClick={onRepost}
        className="hover:text-green-500 transition-transform transform hover:scale-110"
        aria-label="Repostear"
      >
        <BiRepost />
      </button>
      <button
        onClick={onShare}
        className="hover:text-purple-500 transition-transform transform hover:scale-110"
        aria-label="Compartir"
      >
        <TbShare3 />
      </button>
    </div>
  );
};

export default PublicacionBotones;

