import React from 'react';
import Modal from './Modal';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} closeModal={onClose}>
            <h2 className="text-lg font-bold">Confirmar Eliminación</h2>
            <p className="mt-2">¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end mt-4 space-x-4">
                <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Cancelar</button>
                <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
