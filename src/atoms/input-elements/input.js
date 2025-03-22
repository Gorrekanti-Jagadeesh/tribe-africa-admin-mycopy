import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, forwardRef } from 'react';
const Input = forwardRef(
  (
    {
      type = 'text',
      name,
      defaultValue,
      placeholder = 'Provide input',
      action,
      required = false,
      className,
      value, // Controlled value from the parent
      regex,
      error = null,
      patternMessage,
      onChange, // Added onChange handler
      ...props
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    const [validationError, setValidationError] = useState(error);
    const handleFocus = () => {
      setTouched(true);
    };
    const handleBlur = () => {
      if (regex && value && !regex.test(value)) {
        setValidationError(patternMessage || 'Invalid input');
      } else {
        setValidationError(null);
      }
    };
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (action) {
        action(newValue); // Trigger the action function
      }
      if (onChange) {
        onChange(e); // Propagate the change to the parent
      }
      if (regex && validationError) {
        if (regex.test(newValue)) {
          setValidationError(null);
        }
      }
    };
    return _jsxs('div', {
      className: `${className} relative group mt-2 my-4`,
      children: [
        _jsx('label', {
          className: `absolute top-3 left-2.5 origin-0 bg-white cursor-text transition-all
          ${
            value || touched
              ? 'z-10 opacity-100 translate-y-[-1.25rem] scale-75 text-sm text-orange-500 px-2 left-0 duration-300'
              : '-z-20 opacity-0 translate-y-0 scale-100 text-gray-500 px-0 left-2.5 duration-200'
          }
        `,
          children: placeholder,
        }),
        _jsx('input', {
          ref: ref,
          type: type,
          name: name,
          value: value || defaultValue,
          placeholder: placeholder,
          onChange: handleChange,
          onBlur: handleBlur,
          onFocus: handleFocus,
          className: `p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-500
          ${validationError ? 'border-red-500 ' : 'border-gray-400 '}${className}`,
          required: required,
          ...props,
        }),
        validationError &&
          _jsx('span', { className: 'absolute text-red-500 text-xs bottom-1 right-1', children: validationError }),
      ],
    });
  }
);
export default Input;
