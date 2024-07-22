import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import ContactInfo from '../components/ContactInfo';
import { getCategories } from '../services/categoryService';
import { logout } from '../services/authService';
import Authorize from '../components/Authorize';
import ModalForm from '../components/ModalForm';
import CategoryForm from '../components/CategoryForm';
import { LocationIcon, PhoneIcon, WhatsAppIcon } from '../assets/icons/icons';

const Home = () => {

  // Use useState to initialize categories as an empty array
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use useEffect to fetch categories when the component mounts
  useEffect(() => {
    getCategories()
      .then(data => {
        // Update the categories state with the fetched data
        setCategories(data);
        console.log("Fetched categories1:", categories);
      })
      .catch(error => {
        console.error("Failed to fetch categories:", error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col mx-auto w-full max-w-[480px]">
      <header className="flex overflow-hidden md:relative flex-col items-start px-16 pt-5 pb-20 w-full aspect-[2.46]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ccaaab001102f9e76126bc224d5141549923fc432d12bdfb2ca44c060cbe19d?apiKey=fb34ab8a011e440488e897e0309c7345&" alt="Background" className="object-cover absolute inset-0 " />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d24f49f81cd93cf18334d85ef533cb403a2f208335450fcf3b049a6967026575?apiKey=fb34ab8a011e440488e897e0309c7345&" alt="Logo" className="mb-6 ml-3.5 w-56 max-w-full aspect-[1.85]" />
      </header>
      <section className="flex rounded-t-3xl z-10 flex-col px-5 py-8 mt-0 w-full bg-white rounded-[32px_32px_0px_0px] border border-x-4 border-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lato text-xl font-bold leading-tight text-left text-custom-primary">Repostería Sánchez</h1>
          <Authorize requireAdmin={false}>
              <button onClick={logout} className="px-4 py-1 text-sm bg-gray-500 text-white rounded-full">Cerrar Sesión</button>
          </Authorize>
        </div>
        <Authorize>
          <p className='text-green-600 font-medium'>Sesión iniciada como adminstrador</p>
        </Authorize>
        <ContactInfo
          icon={LocationIcon}
          text="Av. 26 de Agosto #9, Puerto Plata, Rep. Dom"
        />
        <ContactInfo
          icon={PhoneIcon}
          text="(829) 910-9672 / (849) 859-6945"
        />
        <ContactInfo
          icon={WhatsAppIcon}
          text="(809) 586-8851"
        />
        <p className="mt-4 text-custom-primary ">
          Pastelería especializada en la creación de tartas matrimoniales
        </p>
        <h2 className="mt-4 text-lg text-lato font-medium text-custom-primary">Categorías</h2>
        <Authorize>
          <button onClick={handleOpenModal} className="mt-3 py-0 bg-lime-500 text-white rounded-full text-3xl">+</button>
        </Authorize>

        <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
          {<CategoryForm />}
        </ModalForm>

        {categories
          .sort((a, b) => a.position - b.position)
          .map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
      </section>
    </main>
  );
};

export default Home;
