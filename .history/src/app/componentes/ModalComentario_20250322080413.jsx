"use client";
import { RiFileCopy2Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import ModalButtons from "../componentes/ModalBotones";

const ModalComentario = ({ show, onClose, onPublish, publication }) => {
  if (!show) return null;

  const [comment, setComment] = useState(""); // Maneja el contenido del comentario
  const [files, setFiles] = useState([]); // Maneja los archivos adjuntos

  // Maneja el cambio de texto del comentario
  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  // Selección de archivos
  const handleFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filePreviews = selectedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
    }));
    setFiles([...files, ...filePreviews]);
  };

  // Elimina un archivo adjunto
  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Publicar el comentario
  const handlePublish = () => {
    console.log("Comentario publicado:", { text: comment, files });
    onPublish({ text: comment, files }); // Retorna el contenido del comentario
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center">Responder a publicación</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>

        {/* Mostrar datos de la publicación */}
        <section className="my-4">
          {publication?.photoURL && (
            <img
              src={publication.photoURL}
              alt="Imagen de la publicación"
              className="w-full rounded-md mb-4"
            />
          )}
          {publication?.text && (
            <p className="text-sm mb-4">{publication.text}</p>
          )}
        </section>

        {/* Área para comentar */}
        <section>
          <textarea
            className="w-full border-l-2 ml-3 pl-6 outline-none focus:ring-0 resize-none"
            placeholder="Escribe tu comentario aquí..."
            value={comment}
            onChange={handleInputChange}
            rows="3"
          ></textarea>

          {/* Previsualización de archivos adjuntos */}
          <div className="preview-container">
            {files.map((file, index) => (
              <div key={index} className="relative my-2">
                {file.type.startsWith("image/") && (
                  <img src={file.preview} alt={file.name} className="w-full rounded-md" />
                )}
                {file.type.startsWith("video/") && (
                  <video src={file.preview} className="w-full rounded-md" controls />
                )}
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveFile(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Adjuntar archivos */}
        <section className="flex justify-between items-center mt-4">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelection}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Adjuntar archivos
          </label>
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            onClick={handlePublish}
          >
            Publicar
          </button>
        </section>
      </div>
    </div>
  );
};

export default ModalComentario;
