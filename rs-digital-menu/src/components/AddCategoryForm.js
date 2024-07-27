import { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import ImageUpload from './ImageUpload';
import { createCategory, updateCategory } from '../services/categoryService';

const AddCategoryForm = ({ isOpen, closeModal, category }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
            setIsVisible(category.isVisible);
            setImage(null);
        } else {
            resetForm(); 
        }
        setIsLoading(false);
    }, [category, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (category) {
                await updateCategory(category.id, {
                    name: categoryName,
                    imageFile: image,
                    isVisible: isVisible,
                    position: category.position
                });
            } else {
                await createCategory({
                    name: categoryName,
                    imageFile: image,
                    isVisible: isVisible,
                    position: 1,
                });
            }
            closeModal();
        } catch (error) {
            console.error("Error saving category:", error);
        } finally {
            setIsLoading(false);
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
            <h2 className="text-2xl font-bold text-stone-800">{category ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
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

                <ImageUpload
                    label="Imagen de fondo:"
                    onChange={setImage}
                    imageUrl={category ? category.imageUrl : null}
                />
                <div className="flex justify-end mt-6 space-x-4">
                    <Button type="button" text="Cancelar" onClick={handleCancel} className='bg-stone-500' />
                    <Button
                        type="submit"
                        text={category ? "Guardar Cambios" : "Guardar"}
                        disabled={isLoading} // Deshabilitar el botón si está en carga
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddCategoryForm;
