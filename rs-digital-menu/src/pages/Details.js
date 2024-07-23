import React, {useState, useEffect} from 'react';
import CategoryItem from '../components/CategoryItem';
import ContactInfo from '../components/ContactInfo';
import PageLayout from '../components/PageLayout';
import { LocationIcon, PhoneIcon, WhatsAppIcon } from '../assets/icons/icons';
import Button from '../components/Button';
import AddProductForm from '../components/AddProductForm';
import Authorize from '../components/Authorize';
import { getProductsByCategory } from '../services/productService';
import { useSearchParams } from 'react-router-dom';
import { fondoProductos, logoRS } from '../assets/icons/images';
import { useAuth } from '../hooks/useAuth';


function Details() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { currentUser } = useAuth();
  
  // Use useState to initialize categories as an empty array
  const [products, setProducts] = useState([]);
  
  // Use useSearchParams to get the categoryId from the URL
  const [searchParams] = useSearchParams();

  // Use useEffect to fetch categories when the component mounts
  useEffect(() => {
      getProductsByCategory(searchParams.get('categoryId'), currentUser?.claims?.admin)
      .then(data => {
        // Update the categories state with the fetched data
        setProducts(data);
        console.log("Fetched products:1", products);
      })
      .catch(error => {
        console.error("Failed to fetch categories:", error);
      });
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
          icon={PhoneIcon}
          text="(829) 910-9672 / (849) 859-6945"
        />
        <ContactInfo
          icon={WhatsAppIcon}
          text="(809) 586-8851"
        />
        </>
      }
      description="Pastelería especializada en la creación de tartas matrimoniales"
    >

      <div className='mt-4 flex justify-between'>
        <h2 className="text-lg font-medium text-custom-primary">
          <span className="text-stone-500">Categorías /</span> {searchParams.get('name')}
        </h2>
        <Authorize>
          <div>
            <Button text="Agregar" onClick={openModal} className='text-sm bg-stone-400 hover:bg-stone-600' />
            <AddProductForm isOpen={isModalOpen} closeModal={closeModal} />
          </div>
        </Authorize>
      </div>
      <div className="flex flex-col gap-3.5 mt-5">
        {products
          .sort((a, b) => a.position - b.position)
          .map((item, index) => (
          <CategoryItem key={index} {...item} />
        ))}
      </div>
    </PageLayout>
  );
}

export default Details;
