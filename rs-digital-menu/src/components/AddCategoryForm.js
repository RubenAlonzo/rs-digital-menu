import { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import ImageUpload from './ImageUpload';
import { createCategory } from '../services/categoryService';
import { useSearchParams } from 'react-router-dom';

const AddCategoryForm = ({ isOpen, closeModal }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [image, setImage] = useState(null);
    const [searchParams] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Category name:', categoryName);
        console.log('Is visible:', isVisible);
        console.log('Category ID:', searchParams.get('categoryId'));

        try {
            // Asegúrate de que image es un archivo antes de llamar a createCategory
            if (image) {
                await createCategory({
                    name: categoryName,
                    imageFile: image, // Asegúrate de que este es un objeto File
                    isVisible: isVisible,
                    position: 1,
                    categoryId: searchParams.get('categoryId')
                });
                closeModal();
            } else {
                console.error("No image file selected");
            }
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const resetForm = () => {
        setCategoryName('');
        setIsVisible(true);
        setImage(null);
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} closeModal={handleCancel}>
            <h2 className="text-2xl font-bold text-stone-800">Agregar Categoría</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <Input
                    label="Nombre de la categoría:"
                    placeholder="Bodas"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
               
                <div className="mt-4">
                    <label className="flex items-center text-stone-700">
                        <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                            className="mr-2"
                        />
                        ¿La categoría es visible?
                    </label>
                </div>

                <ImageUpload label="Imagen de fondo:" onChange={setImage} />
                <div className="flex justify-end mt-6 space-x-4">
                    <Button type="button" text="Cancelar" onClick={handleCancel} className='bg-stone-500' />
                    <Button type="submit" text="Guardar" />
                </div>
            </form>
        </Modal>
    );
};

export default AddCategoryForm;
