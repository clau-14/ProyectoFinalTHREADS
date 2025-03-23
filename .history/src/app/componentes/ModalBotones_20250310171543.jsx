
import { CgMenuLeft } from "react-icons/cg"; 
import { AiOutlineFileGif } from "react-icons/ai"; 
import { MdOutlinePhotoLibrary } from "react-icons/md"; 
import React from "react";
import { FaHashtag, FaMapMarkerAlt } from "react-icons/fa";

const ModalBotones = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const files = event.target.files; // Archivos seleccionados
    if (onFileSelect) {
      onFileSelect(files); // Llama a la función para manejar los archivos seleccionados
    }
  };

  return (
    <div className="icon-container flex justify-start items-center w-72 h-30 text-gray-300 ml-9 gap-3">
      {/* Botón para adjuntar archivos */}
      <label>
        <MdOutlinePhotoLibrary className="cursor-pointer" />
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }} // Escondemos el input y usamos el icono como trigger
        />
      </label>
      <AiOutlineFileGif />
      <FaHashtag />
      <CgMenuLeft />
      <FaMapMarkerAlt />
    </div>
  );
};

export default ModalBotones;
