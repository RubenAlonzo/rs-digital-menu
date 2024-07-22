import { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import ImageUpload from './ImageUpload';

const AddProductForm = ({ isOpen, closeModal }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Product name:', productName);
    console.log('Description:', description);
    console.log('Is visible:', isVisible);
    closeModal();
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
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
        <ImageUpload label="Imagen de fondo:" onChange={setImage} />
        <div className="flex justify-end mt-6 space-x-4">
          <Button type="button" text="Cancelar" onClick={handleCancel} className='bg-stone-500' />
          <Button type="submit" text="Guardar"/>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductForm;