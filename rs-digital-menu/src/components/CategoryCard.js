import React from 'react';

const CategoryCard = ({ imageSrc, title }) => (
  <div className="flex flex-col justify-center mt-6 text-xl font-medium tracking-widest text-white whitespace-nowrap rounded-3xl shadow-sm bg-stone-400">
    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[3.15]">
      <img loading="lazy" src={imageSrc} alt={title} className="object-cover absolute inset-0 size-full" />
      <div className="relative justify-center items-center px-16 py-12 bg-black bg-opacity-30">
        {title}
      </div>
    </div>
  </div>
);

export default CategoryCard;
