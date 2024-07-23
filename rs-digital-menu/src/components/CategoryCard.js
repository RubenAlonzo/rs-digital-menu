import React from 'react';
import Authorize from './Authorize';
import { EditIcon, DeleteIcon } from '../assets/icons/icons';

const CategoryCard = ({ imageUrl, name, onClick }) => (
  <div className="flex flex-col justify-center mt-6 text-xl font-medium tracking-widest text-white whitespace-nowrap cursor-pointer">
    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[3.15] rounded-[20px]">
      <img loading="lazy" src={imageUrl} alt={name} className="object-cover absolute inset-0 size-full rounded-xl" />
      <div onClick={onClick} className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center px-16 py-12 bg-black bg-opacity-30 text-lato font-normal">
        {name}
      </div>
      <Authorize>
        <div className="absolute top-4 right-4 flex items-center">
          <button className="bg-white rounded-l-full w-8 h-8 flex justify-center items-center">
            <EditIcon />
          </button>
          <div className="w-px h-8 bg-gray-500"></div>
          <button className="bg-white rounded-r-full w-8 h-8 flex justify-center items-center">
            <DeleteIcon />
          </button>
        </div>
      </Authorize>
    </div>
  </div>
);

export default CategoryCard;
