import React, { useState } from 'react';

const ModalForm = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-10 pt-8 pb-2 sm:p-6 sm:pb-4">
          <h2 className="text-lg font-medium text-gray-900">Formulario</h2>
            {children}
          </div>
          <div className="my-4 px-4 py-3 sm:px-6 sm:flex">
            
            <button onClick={onClose} className="mx-3 px-5 py-1 bg-gray-400 text-white font-semibold rounded-full">Cancelar</button>

            <button onClick={onClose} className="px-5 py-1 bg-lime-500 text-white font-semibold rounded-full">Guardar</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;