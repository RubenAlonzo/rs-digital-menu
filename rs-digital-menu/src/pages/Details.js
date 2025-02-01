import React, { useState, useEffect } from 'react';
import CategoryItem from '../components/CategoryItem';
import ContactInfo from '../components/ContactInfo';
import PageLayout from '../components/PageLayout';
import { LocationIcon, PhoneIcon, WhatsAppIcon } from '../assets/icons/icons';
import Button from '../components/Button';
import AddProductForm from '../components/AddProductForm';
import Authorize from '../components/Authorize';
import { getProductsByCategory, deleteProduct } from '../services/productService';
import { useSearchParams, Link } from 'react-router-dom';
import { fondoProductos, logoRS } from '../assets/icons/images';
import { useAuth } from '../hooks/useAuth';

function Details() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const { currentUser } = useAuth();

  // Use useState to initialize categories as an empty array
  const [products, setProducts] = useState([]);

  // Use useSearchParams to get the categoryId from the URL
  const [searchParams] = useSearchParams();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await loadProducts();
  };

  const handleEdit = (item) => {
    setCategoryToEdit(item);
    setIsModalOpen(true);
  };

  const loadProducts = async () => {
    getProductsByCategory(searchParams.get('categoryId'), currentUser?.claims?.admin)
      .then(data => {
        // Update the categories state with the fetched data
        setProducts(data);
        console.log("Fetched products:", products);
      })
      .catch(error => {
        console.error("Failed to fetch categories:", error);
      });
  };

  // Use useEffect to fetch categories when the component mounts
  useEffect(() => {
    async function fetchData() {
      await loadProducts();
    }
    fetchData();
  }, [isModalOpen, searchParams]);

  return (
    <PageLayout
      logo={logoRS}
      background={fondoProductos}
      title="Repostería Sánchez"
      contactInfo={
        <>
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
        </>
      }
      description="Repostería especializada en pasteles para todo tipos de eventos."
    >
      <div className='mt-4 flex justify-between'>
        <h1 className="text-xl font-medium mt-1">
          <Link to="/">
            <span className="text-stone-500">Categorías /</span> {searchParams.get('name')}
          </Link>
        </h1>
        <Authorize>
          <div>
            <Button text="Agregar" onClick={openModal} className='text-sm hover:bg-lime-700' />
            <AddProductForm isOpen={isModalOpen} closeModal={closeModal} category={categoryToEdit ? categoryToEdit : null} />
          </div>
        </Authorize>
      </div>
      <div className="flex flex-col gap-3.5 mt-5">
        {products
          .sort((a, b) => a.position - b.position)
          .map((item, index) => (
            <CategoryItem key={index} {...item} handleEdit={() => handleEdit(item)} handleDelete={handleDelete} />
          ))}
      </div>
    </PageLayout>
  );
}

export default Details;
