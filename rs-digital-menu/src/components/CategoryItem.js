import React, { useState } from 'react';
import { formatCurrency } from "../utils/utilities";
import Authorize from './Authorize';
import { EditIcon, DeleteIcon } from '../assets/icons/icons';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const CategoryItem = ({ id, imageUrl, name, price, description, handleDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="relative flex flex-row bg-white">
      <img loading="lazy" src={imageUrl} alt={name} className="aspect-square w-[113px] rounded-xl" />
      <div className="ml-4 text-base font-semibold text-stone-600">
        <h3>{name}</h3>
        <Authorize>
          <div className="absolute top-5 right-1 flex items-center">
            <button className="bg-gray-100 rounded-l-full w-8 h-8 flex justify-center items-center">
              <EditIcon />
            </button>
            <div className="w-px h-8 bg-gray-500"></div>
            <button onClick={() => setIsDeleteModalOpen(true)} className="bg-gray-100 rounded-r-full w-8 h-8 flex justify-center items-center">
              <DeleteIcon />
            </button>
            {isDeleteModalOpen && (
              <DeleteConfirmationModal
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => handleDelete(id)}
                message={`¿Estás seguro de que quieres eliminar ${name}?`}
              />
            )}
          </div>
        </Authorize>
        <p className="font-light -my-1">{formatCurrency(price)}</p>
        <p className="text-xs py-4 text-stone-500">{description}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
