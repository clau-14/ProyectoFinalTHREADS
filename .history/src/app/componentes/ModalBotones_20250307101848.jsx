import React from 'react';
impor
const ModalButtons = ({ onButtonClick }) => {
  return (
    <div className="icon-container">
    <FaImage className="icon" title="Imagen" />
    <GiTheaterCurtains className="icon" title="GIF" />
    <FaHashtag className="icon" title="Hashtag" />
    <FiFileText className="icon" title="Formato de texto" />
    <FaMapMarkerAlt className="icon" title="Ubicación" />
  </div>
  );
};

export default ModalButtons;