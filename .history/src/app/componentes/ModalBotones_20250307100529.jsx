import React from 'react';

const ModalButtons = ({ onButtonClick }) => {
  return (
    <div className="flex justify-between items-center pt-4">
      <button className="px-4 py-2 rounded-lg border-2 border-gray-200 font-bold" onClick={() => onButtonClick('button1')}>
        Botón 1
      </button>
      <button className="px-4 py-2 rounded-lg border-2 border-gray-200 font-bold" onClick={() => onButtonClick('button2')}>
        Botón 2
      </button>
      <button className="px-4 py-2 rounded-lg border-2 border-gray-200 font-bold" onClick={() => onButtonClick('button3')}>
        Botón 3
      </button>
      <button className="px-4 py-2 rounded-lg border-2 border-gray-200 font-bold" onClick={() => onButtonClick('button4')}>
        Botón 4
      </button>
      <button className="px-4 py-2 rounded-lg border-2 border-gray-200 font-bold" onClick={() => onButtonClick('button5')}>
        Botón 5
      </button>
    </div>
  );
};

export default ModalButtons;