"use client";
import { TbShare3 } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";
import useUserStore from "@/store/userstore";
import ModalComentario from "./ModalComentario"; 

const PublicacionBotones = ({ publication }) => {
  const { user } = useUserStore(); // Obtener datos del usuario actual

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePublish = (newComments) => {
    const newCommentThreads = newComments
      .filter((comment) => comment.text.trim() !== "")
      .map((comment) => ({
        id: Date.now() + Math.random(),
        text: comment.text,
        liked: false,
        likes: 0,
        isMenuOpen: false, // Estado inicial del submenú
        userName: user?.displayName || "Usuario Anónimo",
        userPhotoURL: user?.photoURL || "https://via.placeholder.com/50",
      }));
    setComments((prev) => [...prev, ...newCommentThreads]);
    setIsModalOpen(false);
  };

  const handleToggleLikeComment = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      )
    );
  };

  const handleToggleMenu = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, isMenuOpen: !comment.isMenuOpen } : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <>
      <div className="pt-2 mb-2"> 
        {publication && (
          <section className="mb-4">
            {publication.photoURL && (
              <img
                src={publication.photoURL}
                alt="Imagen de la publicación"
                className="w-full rounded-md mb-4"
              />
            )}
            {publication.text && <p className="text-gray-800">{publication.text}</p>}
          </section>
        )}

        <div className="flex gap-4 mt-3">
          <button
            onClick={handleLike}
            className={`transition-transform transform hover:scale-110 flex items-center gap-1 ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
          >
            {liked ? <IoHeartSharp /> : <IoHeartOutline />}
            <span>{likes}</span>
          </button>
          <button
            onClick={handleComment}
            className="hover:text-blue-500 transition-transform transform hover:scale-110 flex items-center"
          >
            <FaRegComment />
          </button>
          <button
            onClick={() => console.log("Reposteo")}
            className="hover:text-green-500 transition-transform transform hover:scale-110 flex items-center"
          >
            <BiRepost />
          </button>
          <button
            onClick={() => console.log("Compartir")}
            className="hover:text-purple-500 transition-transform transform hover:scale-110 flex items-center"
          >
            <TbShare3 />
          </button>
        </div>

        {comments.length > 0 && (
          <div className="mt-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-2 mb-2 bg-white rounded-md shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={comment.userPhotoURL}
                    alt={`Avatar de ${comment.userName}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-bold text-gray-700">{comment.userName}</span>

                  {/* Botón con tres puntos y submenú */}
                  <div className="ml-auto relative">
                    <button
                      onClick={() => handleToggleMenu(comment.id)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      ...
                    </button>
                    {comment.isMenuOpen && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 text-xs px-2 py-2 hover:bg-gray-100 w-full"
                        >
                          Eliminar comentario
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2">{comment.text}</div>

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleToggleLikeComment(comment.id)}
                    className={`transition-transform transform hover:scale-110 flex items-center gap-1 ${
                      comment.liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {comment.liked ? <IoHeartSharp /> : <IoHeartOutline />}
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => console.log("Responder comentario")}
                    className="transition-transform transform hover:scale-110 text-blue-500"
                  >
                    <FaRegComment />
                  </button>
                  <button
                    onClick={() => console.log("Reposteo en comentario")}
                    className="transition-transform transform hover:scale-110 text-green-500"
                  >
                    <BiRepost />
                  </button>
                  <button
                    onClick={() => console.log("Compartir comentario")}
                    className="transition-transform transform hover:scale-110 text-gray-400"
                  >
                    <TbShare3 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalComentario
        show={isModalOpen}
        onClose={handleCloseModal}
        onPublish={handlePublish}
      />
    </>
  );
};

export default PublicacionBotones;



