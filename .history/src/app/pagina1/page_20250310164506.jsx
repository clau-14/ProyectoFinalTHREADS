"use client";

import Contenido from "@/app/componentes/Contenido";
import Videoplayer from "../componentes/Videoplayer";
import Youtube from "../componentes/Youtube";
import Menu from "../componentes/Menu";
import Header from "../componentes/Header";
import Modal from "../componentes/Modal";
import { useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import useUserStore from "@/store/userstore";

export default function ContenidoPage() {
  const [showModal, setShowModal] = useState(false); // mostrar o no el modal
  const [publishedContent, setPublishedContent] = useState([]); // Estado para el contenido publicado
  const [selectedFiles, setSelectedFiles] = useState([]); // Estado para los archivos seleccionados
  const user = useUserStore((state) => state.user);

  // Cargar contenido publicado (solo en cliente)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedContent = JSON.parse(localStorage.getItem("publishedContent")) || [];
      setPublishedContent(storedContent);
    }
  }, []);

  // Guardar contenido en localStorage cada vez que se actualice
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("publishedContent", JSON.stringify(publishedContent));
    }
  }, [publishedContent]);

  // Sincronizar el usuario desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userState = useUserStore.getState();
      userState.syncUserFromLocalStorage();
      console.log("Usuario sincronizado:", userState.user);
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePublishContent = (content) => {
    if (user && user.displayName && user.photoURL) {
      const newPost = {
        content,
        userName: user.displayName,
        userPhoto: user.photoURL,
      };
      setPublishedContent([...publishedContent, newPost]);
      setShowModal(false);
    } else {
      console.error("Datos del usuario no disponibles.");
    }
  };

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Menú */}
      <section className="absolute left-5 top-10">
        <Menu handleOpenModal={handleOpenModal} />
      </section>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center h-full">
        <section>
          <button className="absolute top-5 flex font-bold text-sm">
            Para ti{" "}
            <span className="ml-3 bg-white border rounded-full p-1">
              <AiOutlineDown />
            </span>
          </button>
        </section>

        <section
          style={{ overflowY: "auto", msOverflowStyle: "none", scrollbarWidth: "none" }}
          className="container bg-white flex flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32"
        >
          <Header handleOpenModal={handleOpenModal} />
          <div className="absolute max-h-full top-52">
            {publishedContent.map((post, index) => (
              <div key={index} className="published-content flex items-center gap-4 -mb-6 pb-10">
                {/* Foto de usuario */}
                <img
                  className="rounded-full w-10 ml-12 mt-2 z-40"
                  src={post.userPhoto || ""}
                  alt="Foto de usuario"
                />

                {/* Nombre del usuario */}
                <h1>{post.userName || "Usuario desconocido"}</h1>

                {/* Contenido publicado */}
                <div>
                  <p>{post.content || "Sin contenido disponible"}</p>
                </div>
              </div>
            ))}

            {/* Componentes adicionales */}
            <Contenido />
            <Youtube />
            <Contenido />
            <Youtube />
            <Videoplayer />
            <Contenido />
            <Youtube />
          </div>
        </section>
      </div>

      {/* Botón para abrir el modal */}
      <button
        className="absolute right-12 bottom-5 bg-white rounded-xl border-2 p-7 shadow-lg text-2xl font-bold"
        onClick={handleOpenModal}
      >
        <BiPlus />
      </button>

      {/* Modal */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          onPublish={handlePublishContent}
          selectedFiles={selectedFiles}
          handleFileSelect={handleFileSelect}
        />
      )}
    </div>
  );
}
