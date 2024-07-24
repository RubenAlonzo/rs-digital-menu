import React from 'react';
import { formatCurrency } from "../utils/utilities";
import Authorize from './Authorize';
import { EditIcon, DeleteIcon } from '../assets/icons/icons';

const CategoryItem = ({ imageUrl, name, price, description }) => (
  <div className="relative flex flex-row bg-white">
    <img loading="lazy" src={imageUrl} alt={name} className="aspect-square w-[113px] rounded-xl" />
    <div className="ml-4 text-base font-semibold text-stone-600">
      <h3>{name}</h3>
      <Authorize>
        <div className="absolute top-1 right-1 flex items-center">
          <button className="bg-gray-100 rounded-l-full w-10 h-10 flex justify-center items-center hover:bg-gray-300">
            <EditIcon />
          </button>
          <div className="w-px h-10 bg-gray-300"></div>
          <button className="bg-gray-100 rounded-r-full w-10 h-10 flex justify-center items-center hover:bg-gray-300">
            <DeleteIcon />
          </button>
        </div>
      </Authorize>
      <p className="font-light -my-1">{formatCurrency(price)}</p>
      <p className="text-xs py-4 text-stone-500">{description}</p>
    </div>
  </div>
);

export default CategoryItem;
