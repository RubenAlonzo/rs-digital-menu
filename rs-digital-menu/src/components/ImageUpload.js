// components/ImageUpload.js
import { useState } from 'react';

const ImageUpload = ({ label, onChange }) => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImage(imageData);
        onChange(imageData);
        console.log('Selected image:', imageData);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Unsupported file format');
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

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      <div
        className={`mt-1 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md ${dragging ? 'border-gray-500' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <img src={image} alt="Selected" className="h-full" />
        ) : (
          <label className="cursor-pointer">
            Subir imagen de producto
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
