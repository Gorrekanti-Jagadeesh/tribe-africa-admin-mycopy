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
      className = '',
      value,
      regex,
      error = null,
      patternMessage,
      onChange,
      ...props
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(error);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (action) {
        action(newValue);
      }

      if (onChange) {
        onChange(e);
      }

      if (regex && validationError) {
        if (regex.test(newValue)) {
          setValidationError(null);
        }
      }
    };

    return (
      <div className="relative group mt-2 mb-4 w-full overflow-hidden">
        <label
          className={`absolute top-3 left-2.5 origin-0 bg-white cursor-text transition-all
          ${
            value || touched
              ? 'z-10 opacity-100 -translate-y-5 scale-75 text-sm text-brand-orange px-2 left-0 duration-300'
              : '-z-20 opacity-0 translate-y-0 scale-100 text-gray-500 px-0 left-2.5 duration-200'
          }`}
        >
          {placeholder}
        </label>

        <input
          ref={ref}
          type={type}
          name={name}
          value={value ?? defaultValue ?? ''}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required={required}
          className={`
            w-full
            min-w-0
            box-border
            p-3
            bg-transparent
            border
            outline-none
            rounded-md
            focus:border-brand-orange
            placeholder:text-gray-500
            placeholder:text-[13px]
            md:placeholder:text-xs
            text-sm
            md:text-base
            overflow-hidden
            text-ellipsis
            whitespace-nowrap
            ${validationError ? 'border-red-500' : 'border-gray-400'}
            ${className}
          `}
          {...props}
        />

        {validationError && <span className="absolute text-red-500 text-xs bottom-1 right-1">{validationError}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
