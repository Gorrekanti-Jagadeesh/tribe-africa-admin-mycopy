import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const FileUploadWithPreview = ({ control }: { control: any }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<string[]>([]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFileURLs((prevURLs) => [...prevURLs, ...newFileURLs]);

      // Update the field value with the actual file objects
      field.onChange([...selectedFiles, ...newFiles]);
    }
  };

  // Remove selected file from state and revoke its object URL
  const removeFile = (file: File, field: any) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    setFileURLs((prevURLs) => {
      const index = selectedFiles.indexOf(file);
      if (index !== -1) {
        URL.revokeObjectURL(prevURLs[index]);
        return prevURLs.filter((_, i) => i !== index);
      }
      return prevURLs;
    });

    // Update the field value to remove the file
    field.onChange(selectedFiles.filter((f) => f !== file));
  };

  return (
    <div className="border p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Choose Files to Upload</h3>
      </div>

      {/* File input for selecting multiple files */}
      <Controller
        name="images"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, field)}
              className="mb-4 border p-2 w-full"
            />
            {/* Display selected files as previews */}
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={file.name} className="relative w-20 h-20 border rounded overflow-hidden">
                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(file, field)}
                    className="absolute p-0 m-0 w-5 h-5 rounded-full top-0 right-0 bg-white bg-opacity-75 text-black"
                  >
                    ×
                  </button>

                  {/* Image preview */}
                  <img src={fileURLs[index]} alt={`preview ${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default FileUploadWithPreview;
