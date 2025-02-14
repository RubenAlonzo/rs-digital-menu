import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '../assets/icons/icons';

const PageLayout = ({ logo, background, contactInfo, title, description, children }) => {
  const navigate = useNavigate();

  const homeClick = () => {
    navigate('/'); 
  };
  
  return (
    <main className="flex flex-col mx-auto w-full max-w-[480px]">
      <header className="flex overflow-hidden md:relative flex-col items-center justify-center px-16 pt-5 pb-5 w-full aspect-[2.46]">
        <div className="absolute top-5 left-5 z-10">
          <button onClick={homeClick} className="bg-white hover:bg-gray-100 text-white font-bold py-3 px-3 rounded-full">
            <ArrowBackIcon/>
          </button>
        </div>
        <img loading="lazy" src={background} alt="Background" className="object-cover absolute inset-0 z-0 opacity-90" />
        <img loading="lazy" src={logo} alt="Logo" className="mb-3 w-56 max-w-full aspect-[1.85] relative z-10" />
      </header>
      <section className="flex rounded-t-3xl z-10 flex-col px-5 py-8 -mt-5 w-full min-h-screen bg-white rounded-[32px_32px_0px_0px] border border-x-4 border-white">
        <h1 className="text-xl font-bold leading-tight text-left">{title}</h1>
        {contactInfo}
        <p className="mt-4">{description}</p>
        {children}
      </section>
    </main>
  );
};

export default PageLayout;
