import { useState, useRef } from 'react';

const ImageUpload = ({ label, onChange, existingImageUrl, isEditing }) => {
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result); // Guardar la imagen seleccionada
                onChange(file); // Pasa el archivo real
                setError('');
            };
            reader.readAsDataURL(file);
        } else {
            setError('Formato de archivo no soportado. Por favor, sube una imagen JPEG o PNG.');
            onChange(null);
        }
    };

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-stone-700">{label}</label>
            <div
                className="mt-1 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md border-gray-300 cursor-pointer"
                onClick={openFileInput}
            >
                {isEditing ? ( // Si estamos editando, mostrar la imagen existente
                    existingImageUrl ? (
                        <img src={existingImageUrl} alt="Existing" className="h-full object-cover" />
                    ) : (
                        <span className="text-gray-500">No hay imagen seleccionada</span>
                    )
                ) : (
                    selectedImage ? ( // Si estamos creando, mostrar la imagen seleccionada
                        <img src={selectedImage} alt="Selected" className="h-full object-cover" />
                    ) : (
                        <span className="text-gray-500">Subir imagen de producto</span>
                    )
                )}
                <input
                    type="file"
                    ref={fileInputRef} 
                    accept="image/jpeg, image/png, image/jpg"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>
            {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>
    );
};

export default ImageUpload;
