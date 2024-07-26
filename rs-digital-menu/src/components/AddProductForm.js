import { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import ImageUpload from './ImageUpload';
import { createProduct, updateProduct } from '../services/productService';
import { useSearchParams } from 'react-router-dom';

const AddProductForm = ({ isOpen, closeModal, category = null }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [image, setImage] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('initialData:', category);
    if (category) {
      setProductName(category.name);
      setProductPrice(category.price);
      setDescription(category.description);
      setImage(category.imageUrl);
    } else {
      resetForm();
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Product name:', productName);
    console.log('Description:', description);
    console.log('Is visible:', isVisible);
    console.log(searchParams.get('categoryId'));
    if (category) {
      await updateProduct(category.id, {name: productName, price: productPrice, description: description, imageFile: image, isVisible: isVisible, position: 1, categoryId: searchParams.get('categoryId')});
    } else {
      await createProduct({name: productName, price: productPrice, description: description, imageFile: image, isVisible: isVisible, position: 1, categoryId: searchParams.get('categoryId')})
    }
    closeModal();
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setProductPrice('');
    setIsVisible(true);
    setImage(null);
  };

  const handleCancel = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleCancel}>
      <h2 className="text-2xl font-bold text-stone-800">Agregar producto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <Input
          label="Nombre del producto:"
          placeholder="Producto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          label="Precio del producto:"
          placeholder="Precio"
          value={productPrice}
          type="number"
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <TextArea
          label="Descripción:"
          placeholder="¿De qué está hecho este producto?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-4">
          <label className="flex items-center text-stone-700">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className="mr-2"
            />
            ¿El producto es visible?
          </label>
        </div>
        <ImageUpload label="Imagen de fondo:" onChange={setImage} imageUrl={category ? category.imageUrl : null} />
        <div className="flex justify-end mt-6 space-x-4">
          <Button type="button" text="Cancelar" onClick={handleCancel} className='bg-stone-500 hover:bg-stone-600' />
          <Button type="submit" text="Guardar" className='hover:bg-lime-700 '/>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductForm;