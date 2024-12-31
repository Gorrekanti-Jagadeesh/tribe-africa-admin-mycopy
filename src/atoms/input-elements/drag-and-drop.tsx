import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageDragAndDropProps {
  onFileSelect: (file: File | null) => void;
}

export const disableDragAndDrop = (selector: string) => {
  document.querySelector(selector)?.addEventListener('onmousedown', () => {
    return false;
  });
};

export const ImageDragAndDrop: React.FC<ImageDragAndDropProps> = ({ onFileSelect }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      // Check if the file is a PNG or JPG and is less than or equal to 3MB
      if (file) {
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
          alert('Only PNG or JPG files are accepted!');
          return;
        }
        if (file.size > 3 * 1024 * 1024) {
          alert('File size must be 3MB or less!');
          return;
        }

        setImagePreview(URL.createObjectURL(file));
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/jpeg': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-center transition-colors min-h-64 duration-200 ${
        isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-orange-500">Drop the image here...</p>
      ) : (
        <div className="text-center cursor-pointer">
          {imagePreview ? (
            <>
              Click to <span className="font-bold text-orange-500">Change file</span>
            </>
          ) : (
            <>
              <div className="mt-4 text-gray-600">
                Click to <span className="font-bold text-orange-500">Upload a file</span>
                <p className="pl-1">
                  (or)
                  <br />
                  drag and drop
                </p>
              </div>
              <p className="text-xs text-gray-600">PNG or JPG up to 3MB</p>
            </>
          )}
        </div>
      )}
      {imagePreview && (
        <div className="m-4 relative">
          <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg shadow-sm" />
          <button
            className="bg-orange-500 px-2 rounded-full absolute -right-2 -top-2"
            onClick={() => {
              setImagePreview(null);
              onFileSelect(null);
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};
