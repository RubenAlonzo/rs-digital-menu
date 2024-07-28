import React from 'react';
import Authorize from './Authorize';
import { EditIcon, DeleteIcon } from '../assets/icons/icons';

const CategoryCard = ({ imageUrl, name, onClick, onEdit, onDelete }) => (
  <div className="flex flex-col justify-center mt-6 text-xl font-medium tracking-widest text-white whitespace-nowrap cursor-pointer">
    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[3.15] rounded-[20px]">
      <img loading="lazy" src={imageUrl} alt={name} className="object-cover absolute inset-0 size-full rounded-xl" />
      <div onClick={onClick} className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center px-16 py-12 bg-black bg-opacity-30 text-lato font-normal uppercase">
        {name}
      </div>
      <Authorize>
        <div className="absolute top-4 right-4 flex items-center">
          <button onClick={onEdit} className="bg-gray-100 rounded-l-full w-10 h-10 flex justify-center items-center hover:bg-gray-200">
            <EditIcon />
          </button>
          <div className="w-px h-10 bg-gray-300"></div>
          <button onClick={onDelete} className="bg-gray-100 rounded-r-full w-10 h-10 flex justify-center items-center hover:bg-gray-200">
            <DeleteIcon />
          </button>
        </div>
      </Authorize>
    </div>
  </div>
);

export default CategoryCard;
