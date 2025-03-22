import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// export const disableDragAndDrop = (selector: string) => {
//   document.querySelector(selector)?.addEventListener('onmousedown', () => {
//     return false;
//   });
// };
export const ImageDragAndDrop = ({ onFileSelect, placeholder }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
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
  return _jsxs('div', {
    ...getRootProps(),
    className: `w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-center transition-colors min-h-64 duration-200 ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-gray-50'}`,
    children: [
      _jsx('input', { ...getInputProps() }),
      isDragActive
        ? _jsx('p', { className: 'text-orange-500', children: 'Drop the image here...' })
        : _jsx('div', {
            className: 'text-center cursor-pointer',
            children: imagePreview
              ? _jsxs(_Fragment, {
                  children: [
                    'Click to ',
                    _jsx('span', { className: 'font-bold text-orange-500', children: 'Change file' }),
                  ],
                })
              : _jsxs(_Fragment, {
                  children: [
                    _jsxs('div', {
                      className: 'mt-4 text-gray-600',
                      children: [
                        'Click to ',
                        _jsx('span', { className: 'font-bold text-orange-500', children: placeholder }),
                        _jsxs('p', { className: 'pl-1', children: ['(or)', _jsx('br', {}), 'drag and drop'] }),
                      ],
                    }),
                    _jsx('p', { className: 'text-xs text-gray-600', children: 'PNG or JPG up to 3MB' }),
                  ],
                }),
          }),
      imagePreview &&
        _jsxs('div', {
          className: 'm-4 relative',
          children: [
            _jsx('img', {
              src: imagePreview,
              alt: 'Preview',
              className: 'w-full max-h-64 object-contain rounded-lg shadow-sm',
            }),
            _jsx('button', {
              className: 'bg-orange-500 px-2 rounded-full absolute -right-2 -top-2',
              onClick: () => {
                setImagePreview(null);
                onFileSelect(null);
              },
              children: 'x',
            }),
          ],
        }),
    ],
  });
};
