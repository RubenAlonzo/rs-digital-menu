// components/ImageUpload.js
import { useState, useEffect } from 'react';

const ImageUpload = ({ label, onChange, imageUrl = null }) => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImage(imageData);
        onChange(file); // Pass the actual file instead of base64 data
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
          <div className='relative w-full h-full'>
            <img src={image} alt="Selected" className="h-full mx-auto" />
              <div className='absolute-centered'>
                <input
                  className="p-11 hover:cursor-pointer opacity-0"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleImageChange}
                  />
              </div>
          </div>

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
