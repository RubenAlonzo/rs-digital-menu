import React from 'react';

const CategoryForm = ({ onSubmit }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        imageFile: null,
        isVisible: false,
        position: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, isVisible: e.target.checked });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, imageFile: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre de la categoría:</label>
                <input type="text" id="name" name="name" onChange={handleInputChange} value={formData.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
                <label htmlFor="isVisible" className="inline-flex items-center">
                    <input type="checkbox" id="isVisible" name="isVisible" onChange={handleCheckboxChange} checked={formData.isVisible} className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">¿La categoría es visible?</span>
                </label>

                <label htmlFor="imageFile" className="block text-gray-700 text-sm font-bold mt-4">Imagen de categoría:</label>
                <div className="relative border rounded border-dashed border-gray-400 p-12 mt-1">
                    <label htmlFor="imageFile" className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <span className="text-gray-500">Subir imagen</span>
                        <input type="file" id="imageFile" name="imageFile" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                </div>
            </div>

        </form>
    );
};

export default CategoryForm;
