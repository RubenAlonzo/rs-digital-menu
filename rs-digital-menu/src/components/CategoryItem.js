import React from 'react';
import { formatCurrency } from "../utils/utilities";

const CategoryItem = ({ imageUrl, name, price, description }) => (
  <div className="flex flex-row">
    <img loading="lazy" src={imageUrl} alt={name} className="aspect-square w-[113px] rounded-xl" />
    <div className="ml-4 text-base font-semibold text-stone-600">
      <h3>{name}</h3>
      <p className="font-light -my-1">{formatCurrency(price)}</p>
      <p className="text-xs py-4 text-stone-500">{description}</p>
    </div>
  </div>
);

export default CategoryItem;
