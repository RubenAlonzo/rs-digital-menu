import React from 'react';

const CategoryItem = ({ imageSrc, title, price, description }) => (
  <div className="flex flex-row items-center">
    <img loading="lazy" src={imageSrc} alt={title} className="aspect-square w-[113px]" />
    <div className="ml-4 text-base font-semibold text-stone-700">
      <h3>{title}</h3>
      <p className="font-light">{price} DOP</p>
      <p className="text-sm text-stone-500">{description}</p>
    </div>
  </div>
);

export default CategoryItem;
