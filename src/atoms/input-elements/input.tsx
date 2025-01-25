import React, { useState, forwardRef } from 'react';
import { InputProps } from '../../types/index';

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      name,
      defaultValue,
      placeholder = 'Provide input',
      action,
      required = false,
      className,
      regex,
      error = null,
      patternMessage,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue || '');
    const [touched, setTouched] = useState(false);

    const [validationError, setValidationError] = useState<string | null>(error);

    const handleFocus = () => {
      setTouched(true);
    };

    const handleBlur = () => {
      if (regex && !regex.test(value)) {
        setValidationError(patternMessage || 'Invalid input');
      } else {
        setValidationError(null);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (action) {
        action(newValue); // Trigger the action function
      }

      if (regex && validationError) {
        if (regex.test(newValue)) {
          setValidationError(null);
        }
      }
    };

    return (
      <div className={`${className} relative group my-3`}>
        <label
          className={`absolute top-3 left-2.5 origin-0 bg-white cursor-text transition-all
          ${
            value || touched
              ? 'z-10 opacity-100 translate-y-[-1.25rem] scale-75 text-sm text-orange-500 px-2 left-0 duration-300'
              : '-z-20 opacity-0 translate-y-0 scale-100 text-gray-500 px-0 left-2.5 duration-200'
          }
        `}
        >
          {placeholder}
        </label>

        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-500
          ${validationError ? 'border-red-500 ' : 'border-gray-400 '}${className}`}
          required={required}
          {...props}
        />

        {validationError && <span className="absolute text-red-500 text-xs bottom-1 right-1">{validationError}</span>}
      </div>
    );
  }
);

export default Input;
