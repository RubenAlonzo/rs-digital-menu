import React from 'react';
import Modal from './Modal';
import Button from './Button';

const DeleteConfirmationModal = ({ onClose, onDelete, message }) => {
  const handleDelete = async () => {
    await onDelete(); // Execute the passed deletion callback
    onClose(); // Close the modal after deletion
  };

  return (
    <Modal isOpen={true} closeModal={onClose}>
      <h2 className="text-2xl font-bold text-stone-800">Confirmar Eliminación</h2>
      <p className="mt-4">{message}</p>
      <div className="flex justify-end space-x-4 mt-8">
        <Button text="Cancelar" onClick={onClose} className='text-sm bg-stone-400 hover:bg-stone-600' />
        <Button onClick={handleDelete} text="Eliminar" className='py-2 px-4 bg-red-500 hover:bg-red-700 text-white'/>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
