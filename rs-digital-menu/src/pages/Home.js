import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import ContactInfo from '../components/ContactInfo';
import { getCategories, deleteCategory } from '../services/categoryService';
import { logout } from '../services/authService';
import Authorize from '../components/Authorize';
import useNavigateSearch from '../hooks/useNavigateSearch';
import AddCategoryForm from '../components/AddCategoryForm';
import { LocationIcon, PhoneIcon, WhatsAppIcon } from '../assets/icons/icons';
import { fondoProductos, logoRS } from '../assets/icons/images';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Button from '../components/Button';

const Home = () => {

  // Use useState to initialize categories as an empty array
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    loadCategories(); // Cargar categorías al montar el componente
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      console.log("Fetched categories:", data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const openModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategory(categoryId); // Guardar el ID de la categoría a eliminar
    setDeleteModalOpen(true); // Abrir el modal de confirmación
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteCategory(selectedCategory);
        loadCategories(); // Volver a cargar las categorías después de la eliminación
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
    setDeleteModalOpen(false); // Cerrar el modal de confirmación
    setSelectedCategory(null); // Limpiar la categoría seleccionada
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

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
  }, [isModalOpen]);

  // Use the useNavigateSearch hook to navigate to the Details page
  const navigateSearch = useNavigateSearch();
  const goToDetails = (id, name) => navigateSearch('/details', { categoryId: id, name: name });

  return (
    <main className="flex flex-col mx-auto w-full max-w-[480px]">
      <header className="flex overflow-hidden md:relative flex-col items-center justify-center px-16 pt-5 pb-5 w-full aspect-[2.46]">
        <img loading="lazy" src={fondoProductos} alt="Background" className="object-cover absolute inset-0 z-0 opacity-90" />

        <img loading="lazy" src={logoRS} alt="Logo" className="mb-3 w-56 max-w-full aspect-[1.85] relative z-10" />
      </header>
      <section className="flex rounded-t-3xl z-10 flex-col px-5 py-8 -mt-5 w-full min-h-screen bg-white rounded-[32px_32px_0px_0px] border border-x-4 border-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lato text-xl font-bold leading-tight text-left">Repostería Sánchez</h1>
          <Authorize requireAdmin={false}>
            <button onClick={logout} className="px-4 py-1 text-sm bg-gray-500 text-white rounded-full hover:bg-gray-600">Cerrar Sesión</button>
          </Authorize>
        </div>
        <ContactInfo
          icon={LocationIcon}
          text="Av. 26 de Agosto #9, Puerto Plata, Rep. Dom"
        />
        <ContactInfo
          icon={WhatsAppIcon}
          text="(829) 910-9672 / (849) 859-6945"
        />
        <ContactInfo
          icon={PhoneIcon}
          text="(809) 586-8851"
        />
        <p className="mt-4">Repostería especializada en pasteles para todo tipos de eventos.</p>

        <div className='mt-4 flex justify-between'>
          <h2 className="text-lg font-medium text-custom-primary">Categorías</h2>
          <Authorize>
            <div>
              <Button text="Agregar" onClick={openModal} className='text-sm hover:bg-lime-700 ' />
              <AddCategoryForm isOpen={isModalOpen} closeModal={closeModal} category={selectedCategory} />
            </div>
          </Authorize>
        </div>
        {/* Modal de Confirmación de Eliminación */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />

        {categories
          .sort((a, b) => a.position - b.position)
          .map((category, index) => (
            <CategoryCard key={index} {...category} onClick={() => goToDetails(category.id, category.name)} onEdit={() => handleEditClick(category)} onDelete={() => handleDeleteClick(category.id)} />
          ))}
      </section>
    </main>
  );
};

export default Home;
