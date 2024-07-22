import React from 'react';
import Authorize from './Authorize';

const CategoryCard = ({ imageSrc, title }) => (
  <div className="flex flex-col justify-center mt-6 text-xl font-medium tracking-widest text-white whitespace-nowrap">
    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[3.15] rounded-[20px]">
      <img loading="lazy" src={imageSrc} alt={title} className="object-cover absolute inset-0 size-full" />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center px-16 py-12 bg-black bg-opacity-30 text-lato font-normal">
        {title}
      </div>
      <Authorize>
        <div className="absolute top-4 right-4 flex space-x-1">
          <button className="bg-white rounded-l-full w-8 h-8 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="black" d="m2.777 19.783l.607-4.162c.037-.272.161-.525.355-.72L15.5 3.124a1.265 1.265 0 0 1 1.19-.341a6.21 6.21 0 0 1 2.832 1.694a6.21 6.21 0 0 1 1.682 2.846a1.265 1.265 0 0 1-.341 1.19L9.089 20.275a1.265 1.265 0 0 1-.721.354l-4.161.607a1.264 1.264 0 0 1-1.43-1.454M13.275 5.364l5.363 5.363" /></svg>
          </button>
          <button className="bg-white rounded-r-full w-8 h-8 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="black" d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75" /></svg>
          </button>
        </div>
      </Authorize>
    </div>
  </div>
);

export default CategoryCard;
