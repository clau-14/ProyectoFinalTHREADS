import React from 'react';
import { FaImage, FaHashtag, FaMapMarkerAlt } from 'react-icons/fa';
import { GiTheaterCurtains } from 'react-icons/gi';
import { FiFileText } from 'react-icons/fi';


const ModalButtons = ({ onButtonClick }) => {
  return (
    <div className="icon-container fle">
    <FaImage className="icon" title="Imagen" />
    <GiTheaterCurtains className="icon" title="GIF" />
    <FaHashtag className="icon" title="Hashtag" />
    <FiFileText className="icon" title="Form ato de texto" />
    <FaMapMarkerAlt className="icon" title="Ubicación" />
  </div>
  );
};

export default ModalButtons;