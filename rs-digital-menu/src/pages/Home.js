import React from 'react';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const categories = [
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/196b179e74c6d1d79897240557c5ac19e8c8a3ea7580a799b60993ebc83d6bed?apiKey=fb34ab8a011e440488e897e0309c7345&", title: "BODAS" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b24c1a8a555f081def7204a99ee2ad405b28dc775f8a3149de54e68717aab16e?apiKey=fb34ab8a011e440488e897e0309c7345&", title: "CUMPLEAÑOS" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b0d471b30a702e5d443057b43ecb86d1256635711322c7ab336806366bd71905?apiKey=fb34ab8a011e440488e897e0309c7345&", title: "OTROS" },
  ];

  return (
    <div className="flex flex-col mx-auto w-full max-w-[480px]">
      <header className="flex overflow-hidden relative flex-col items-start px-16 pt-5 pb-20 w-full aspect-[1.46]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ccaaab001102f9e76126bc224d5141549923fc432d12bdfb2ca44c060cbe19d?apiKey=fb34ab8a011e440488e897e0309c7345&" alt="Background" className="object-cover absolute inset-0 size-full" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d24f49f81cd93cf18334d85ef533cb403a2f208335450fcf3b049a6967026575?apiKey=fb34ab8a011e440488e897e0309c7345&" alt="Logo" className="mb-6 ml-3.5 w-56 max-w-full aspect-[1.85]" />
      </header>
      <main className="flex z-10 flex-col px-5 py-12 mt-0 w-full text-sm bg-white rounded-[32px_32px_0px_0px] text-stone-700">
        <h1 className="text-2xl font-bold">Repostería Sánchez</h1>
        <p className="mt-5 text-lg tracking-wide">Pastelería especializada en la creación de tartas matrimoniales</p>
        <h2 className="mt-8 text-2xl font-medium">Categorías</h2>
        {categories.map((category, index) => (
          <CategoryCard key={index} imageSrc={category.imageSrc} title={category.title} />
        ))}
      </main>
    </div>
  );
};

export default Home;
