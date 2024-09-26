import Image from "next/image";
import React, { useState, DragEvent } from "react";

interface PhotoUploadProps {
  onFileChange: (file: File | null) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
    onFileChange(file);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed p-6 rounded-lg transition-colors 
        ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-100"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover mb-4 rounded-lg"
          />
        ) : (
          <div className="text-center text-gray-500">
            <p>Drag and drop your image here or</p>
            <label className="cursor-pointer text-blue-500 underline">
              Browse File
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
