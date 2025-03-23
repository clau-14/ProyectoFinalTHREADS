import { CgMenuLeft } from "react-icons/cg"; 
import { AiOutlineFileGif } from "react-icons/ai"; 
import { MdOutlinePhotoLibrary } from "react-icons/md"; 
import React, { useRef } from 'react';
import { FaHashtag, FaMapMarkerAlt } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const ModalButtons = ({ onButtonClick }) => {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Aquí puedes manejar los archivos seleccionados
      console.log(files);
      onButtonClick(files);
    }
  };

  return (
    <div className="icon-container flex justify-start items-center w-72 h-30 text-gray-300 ml-9 gap-3">
      <MdOutlinePhotoLibrary onClick={handleFileInputClick} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
      <AiOutlineFileGif />
      <FaHashtag />
      <CgMenuLeft />
      <FaMapMarkerAlt />
    </div>
  );
};

export default ModalButtons;