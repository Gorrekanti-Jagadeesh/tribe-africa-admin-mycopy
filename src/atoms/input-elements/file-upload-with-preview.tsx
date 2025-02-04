import React, { useState, useRef } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';

const FileUploadWithPreview = ({ control, maxFilesLength }: { control: Control; maxFilesLength: number }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const maxFiles = maxFilesLength;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: FieldValues) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
      const updatedFiles = [...selectedFiles, ...newFiles];
      const updatedFileURLs = [...fileURLs, ...newFileURLs];

      setSelectedFiles(updatedFiles);
      setFileURLs(updatedFileURLs);

      field.onChange(updatedFiles);
    }
  };

  const removeFile = (file: File, field: FieldValues) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    const index = selectedFiles.indexOf(file);

    setSelectedFiles(updatedFiles);
    setFileURLs((prevURLs) => {
      if (index !== -1) {
        URL.revokeObjectURL(prevURLs[index]);
        return prevURLs.filter((_, i) => i !== index);
      }
      return prevURLs;
    });

    field.onChange(updatedFiles);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="">
      <Controller
        name="images"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div className="flex gap-4">
            <div
              className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 w-40 bg-gray-100 cursor-pointer"
              onClick={handleCameraClick}
            >
              <FaCamera size={40} className="text-gray-500" />
              <span className="text-gray-500">(Up to {maxFiles})</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, field)}
              className="hidden"
              disabled={selectedFiles.length >= maxFiles}
            />
            <div className="flex gap-2">
              {selectedFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="relative w-20 h-20 border rounded overflow-hidden">
                  <button
                    onClick={() => removeFile(file, field)}
                    className="absolute p-0 m-0 w-5 h-5 rounded-full top-0 right-0 bg-white bg-opacity-75 text-black"
                  >
                    ×
                  </button>
                  <img src={fileURLs[index]} alt={`preview ${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default FileUploadWithPreview;
