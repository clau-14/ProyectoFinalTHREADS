import { AiOutlineFileGif } from "react-icons/ai"; 
import { MdOutlinePhotoLibrary } from "react-icons/md"; 
import React from 'react';
import { FaImage, FaHashtag, FaMapMarkerAlt } from 'react-icons/fa';
import { GiTheaterCurtains } from 'react-icons/gi';
import { FiFileText } from 'react-icons/fi';


const ModalButtons = ({ onButtonClick }) => {
  return (
    <div className="icon-container flex justify-start  items-center w-30 h-30 text-gray-300">
    <MdOutlinePhotoLibrary />
    <AiOutlineFileGif />
    <GiTheaterCurtains className="icon" title="GIF" />
    <FaHashtag className="icon" title="Hashtag" />
    <FiFileText className="icon" title="Form ato de texto" />
    <FaMapMarkerAlt className="icon" title="Ubicación" />
  </div>
  );
};

export default ModalButtons;