import React from 'react';

const PublicacionBotones = ({ onEdit, onDelete, onShare, onSave }) => {
  return (
    <div className="flex gap-4 mt-2">
      <button
      >
        <IoHeartOutline />
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={onDelete}
      >
        Eliminar
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={onShare}
      >
        Compartir
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={onSave}
      >
        Guardar
      </button>
    </div>
  );
};

export default PublicacionBotones;
