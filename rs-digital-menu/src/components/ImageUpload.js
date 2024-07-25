import { useState, useRef } from 'react';

const ImageUpload = ({ label, onChange, existingImageUrl }) => {
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onChange(file);
                setError('');
            };
            reader.readAsDataURL(file);
        } else {
            setError('Formato de archivo no soportado. Por favor, sube una imagen JPEG o PNG.');
            onChange(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleImageChange(e);
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
                className={`mt-1 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md ${dragging ? 'border-gray-500' : 'border-gray-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileInput}
            >
                {existingImageUrl ? ( 
                    <img src={existingImageUrl} alt="Existing" className="h-full object-cover cursor-pointer" />
                ) : (
                    <label className="cursor-pointer">
                        Subir imagen de producto
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/jpeg, image/png, image/jpg"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                )}
            </div>
            {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>
    );
};

export default ImageUpload;
