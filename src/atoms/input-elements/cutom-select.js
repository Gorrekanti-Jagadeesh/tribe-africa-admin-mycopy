import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef, useState } from 'react';
export const CustomSelect = forwardRef(
  (
    {
      options,
      name,
      placeholder,
      error,
      required = true,
      label,
      defaultValue,
      value,
      containerClasses,
      customInputClasses,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    return _jsxs('div', {
      className: `relative ${containerClasses}`,
      children: [
        label &&
          _jsxs('label', {
            className: 'static block mb-1 font-semibold',
            children: [label, required && _jsx('span', { className: 'text-red-500 text-sm', children: '*' })],
          }),
        _jsxs('select', {
          ref: ref,
          name: name,
          onFocus: handleFocus,
          value: value,
          defaultValue: defaultValue,
          className: `p-2 text-sm block w-1/2 h-10 bg-transparent border outline-none rounded-md focus:border-orange-500
          ${error ? 'border-red-500' : 'border-gray-400'}  appearance-none ${customInputClasses}`,
          ...props,
          children: [
            _jsx('option', { value: '', disabled: true, selected: Boolean(!defaultValue), children: placeholder }),
            options.map((option) => _jsx('option', { value: option.value, children: option.label }, option.value)),
          ],
        }),
        _jsxs('div', {
          children: [
            _jsx('label', {
              htmlFor: name,
              className: `absolute duration-300 top-10 text-sm left-2.5 origin-0 z-10 bg-white transition-all cursor-text
          ${isFocused ? '-translate-y-5 scale-75 text-orange-500 px-2 left-0' : 'text-gray-400'}`,
              children: placeholder,
            }),
            _jsx('span', {
              className: 'absolute right-[52%] top-10 pointer-events-none text-gray-600 text-xs',
              'aria-hidden': 'true',
              children: '\u25BC',
            }),
          ],
        }),
        error && _jsxs('span', { className: 'text-red-500 text-xs', children: [error.message, '*'] }),
      ],
    });
  }
);
