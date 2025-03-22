import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
const FileUploadWithPreview = ({ control, maxFilesLength, setValue, fieldName }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const fileInputRef = useRef(null);
  const maxFiles = maxFilesLength || 3;
  const handleFileChange = (event, field) => {
    console.log('-----image111');
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      // create a preview URL for each file using URL.createObjectURL(file)
      const newFileURLs = newFiles.map((file) => {
        const previewURL = URL.createObjectURL(file);
        return previewURL;
      });
      const updatedFiles = [...selectedFiles, ...newFiles];
      const updatedFileURLs = [...fileURLs, ...newFileURLs];
      setSelectedFiles(updatedFiles);
      setFileURLs(updatedFileURLs);
      setValue(fieldName, updatedFileURLs[0]);
      console.log('-----image', updatedFileURLs);
      field.onChange(updatedFiles);
    }
  };
  const removeFile = (file, field) => {
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
    setValue(fieldName, updatedFiles[0] || null);
    field.onChange(updatedFiles);
  };
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return _jsx('div', {
    className: '',
    children: _jsx(Controller, {
      name: 'images',
      control: control,
      defaultValue: [],
      render: ({ field }) =>
        _jsxs('div', {
          className: 'flex gap-4',
          children: [
            _jsxs('div', {
              className:
                'flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 w-40 bg-gray-100 cursor-pointer',
              onClick: handleCameraClick,
              children: [
                _jsx(FaCamera, { size: 40, className: 'text-gray-500' }),
                _jsxs('span', { className: 'text-gray-500', children: ['(Up to ', maxFiles, ')'] }),
              ],
            }),
            _jsx('input', {
              ref: fileInputRef,
              type: 'file',
              multiple: true,
              onChange: (e) => handleFileChange(e, field),
              className: 'hidden',
              disabled: selectedFiles.length >= maxFiles,
            }),
            _jsx('div', {
              className: 'flex gap-2',
              children: selectedFiles.map((file, index) =>
                _jsxs(
                  'div',
                  {
                    className: 'relative w-20 h-20 border rounded overflow-hidden',
                    children: [
                      _jsx('button', {
                        onClick: () => removeFile(file, field),
                        className:
                          'absolute p-0 m-0 w-5 h-5 rounded-full top-0 right-0 bg-white bg-opacity-75 text-black',
                        children: '\u00D7',
                      }),
                      _jsx('img', {
                        src: fileURLs[index],
                        alt: `preview ${index}`,
                        className: 'w-full h-full object-cover',
                      }),
                    ],
                  },
                  `${file.name}-${index}`
                )
              ),
            }),
          ],
        }),
    }),
  });
};
export default FileUploadWithPreview;
