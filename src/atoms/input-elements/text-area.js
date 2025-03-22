import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
export const Textarea = ({ name, placeholder, error, className, required, ...props }) =>
  _jsxs('div', {
    className: `relative ${className}`,
    children: [
      _jsx('textarea', {
        placeholder: placeholder,
        name: name,
        ...props,
        className: `p-2 block w-full bg-transparent border outline-none rounded-md focus:border-orange-500
        ${error ? 'border-red-500 ' : 'border-gray-400 '}`,
        required: required,
      }),
      error && _jsx('span', { className: 'absolute text-red-500 text-xs bottom-1 right-1', children: error }),
    ],
  });
