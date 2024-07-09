import React from 'react';

const PageLayout = ({ logo, background, contactInfo, title, description, children }) => {
    return (
      <main className="flex flex-col mx-auto w-full max-w-[480px]">
        <header className="flex overflow-hidden md:relative flex-col items-start px-16 pt-5 pb-20 w-full aspect-[2.46]">
          <img loading="lazy" src={background} alt="Background" className="object-cover absolute inset-0" />
          <img loading="lazy" src={logo} alt="Logo" className="mb-6 ml-3.5 w-56 max-w-full aspect-[1.85]" />
        </header>
        <section className="flex rounded-t-3xl z-10 flex-col px-5 py-8 mt-0 w-full bg-white rounded-[32px_32px_0px_0px] border border-x-4 border-white">
        <h1 className="text-xl font-bold leading-tight text-left text-custom-primary">{title}</h1>
          {contactInfo}
        <p className="mt-4 text-custom-primary">{description}</p>
          {children}
        </section>
      </main>
    );
  };

export default PageLayout ;
