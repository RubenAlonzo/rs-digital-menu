import React from 'react';

const CategoryItem = ({ imageSrc, title, price, description }) => (
  <div className="flex flex-row">
    <img loading="lazy" src={imageSrc} alt={title} className="aspect-square w-[113px]" />
    <div className="ml-4 text-base font-semibold text-stone-600">
      <h3>{title}</h3>
      <p className="font-light -my-1">{price} DOP</p>
      <p className="text-xs py-4 text-stone-500">{description}</p>
    </div>
  </div>
);

export default CategoryItem;
