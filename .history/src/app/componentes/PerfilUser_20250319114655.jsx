"use client"
import { useEffect, useState } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import { AiOutlineInstagram } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import Header from "./Header";
import Modal from "./Modal";

const PerfilUser = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
  const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado

  const user = useUserStore((state) => state.user);

  // Cargar contenido publicado (solo en la página 1)
  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem("publishedContent")) || [];
    setPublishedContent(storedContent);
  }, []);

  // Guardar contenido en localStorage cada vez que se actualice
  useEffect(() => {
    localStorage.setItem("publishedContent", JSON.stringify(publishedContent));
  }, [publishedContent]);

  useEffect(() => {
    const userState = useUserStore.getState();
    userState.syncUserFromLocalStorage();
    console.log("Usuario sincronizado:", userState.user);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
  };

  // Lógica para publicar contenido (solo crear publicaciones, no editar)
  const handlePublishContent = (content) => {
    if (user && user.displayName && user.photoURL) {
      const newPost = {
        content: content || [], // Asegurar que sea un array
        userName: user.displayName,
        userPhoto: user.photoURL,
      };
      setPublishedContent([...publishedContent, newPost]);
    } else {
      console.error("Datos del usuario no disponibles.");
    }
    setShowModal(false); // Cierra el modal después de publicar
  };

  return (
   
};

export default PerfilUser;