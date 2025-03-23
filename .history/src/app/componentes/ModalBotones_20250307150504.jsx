import { CgMenuLeft } from "react-icons/cg"; 
import { AiOutlineFileGif } from "react-icons/ai"; 
import { MdOutlinePhotoLibrary } from "react-icons/md"; 
import React from 'react';
import { FaHashtag, FaMapMarkerAlt } from 'react-icons/fa';

import { FiFileText } from 'react-icons/fi';


const ModalButtons = ({ onButtonClick }) => {
  return (
    <div className="icon-container flex justify-start  items-center w-72 h-30 text-gray-300 ml-9 gap-3">
    <MdOutlinePhotoLibrary />
    <AiOutlineFileGif />
    <FaHashtag  />
    <CgMenuLeft />
    <FaMapMarkerAlt  />
  </div>
  );
};

export default ModalButtons;