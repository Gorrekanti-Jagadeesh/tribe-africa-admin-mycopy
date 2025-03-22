import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect } from 'react';
export const Select = forwardRef(
  ({ options, name, onChange, placeholder, error, className, required, formType, value, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState('');
    // Reset selected value when formType changes
    useEffect(() => {
      setSelectedValue('');
    }, [formType]);
    return _jsxs('div', {
      className: `relative ${className}`,
      children: [
        _jsxs('select', {
          ref: ref,
          name: name,
          value: selectedValue,
          onChange: (e) => {
            setSelectedValue(e.target.value);
            if (onChange) onChange(e.target.value);
          },
          required: required,
          ...props,
          className: `p-2 block w-full bg-transparent border outline-none rounded-md focus:border-orange-500 
          ${error ? 'border-red-500' : 'border-gray-400'} appearance-none`,
          children: [
            _jsx('option', { value: '', disabled: true, children: placeholder }),
            options.map((option) => _jsx('option', { value: option.value, children: option.label }, option.value)),
          ],
        }),
        _jsx('label', {
          htmlFor: name,
          className: `absolute duration-300 top-3 left-2.5 origin-0 z-10 bg-white transition-all cursor-text
          ${selectedValue ? '-translate-y-5 scale-75 text-sm text-orange-500 px-2 left-0' : ''}`,
          children: placeholder,
        }),
        error && _jsx('span', { className: 'absolute text-red-500 text-xs bottom-1 right-1', children: error }),
      ],
    });
  }
);
