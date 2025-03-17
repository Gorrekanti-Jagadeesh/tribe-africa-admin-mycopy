import React, { useState, forwardRef } from 'react';
import { HookInputProps } from '../../types/index';

const CustomInput: React.FC<HookInputProps> = forwardRef<HTMLInputElement, HookInputProps>(
  (
    {
      type = 'text',
      name,
      value,
      defaultValue,
      placeholder = 'Provide input',
      required = true,
      className,
      customInputClassNames,
      error,
      label,
      ...props
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);

    const handleFocus = () => {
      setTouched(true);
    };
    return (
      <div className={`${className} relative group mt-2 my-4`}>
        {label && (
          <label className="block mb-2 font-semibold">
            {label}
            {required && <span className="text-red-500 text-sm">*</span>}
          </label>
        )}
        <label
          className={`absolute left-2.5 origin-0 bg-white cursor-text transition-all
            ${label ? 'top-11' : 'top-2.5'}
          ${touched || error ? 'z-10 opacity-100 translate-y-[-1.25rem] scale-75 text-sm text-orange-500 px-2 left-0 duration-300' : '-z-20 opacity-0 translate-y-0 scale-100 text-gray-500 px-0 left-2.5 duration-200'}
        `}
        >
          {placeholder}
        </label>

        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={!error || touched ? placeholder : ''}
          onFocus={handleFocus}
          className={`p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500 placeholder:text-gray-500
          ${error ? 'border-red-500 ' : 'border-gray-400 '} ${customInputClassNames}`}
          {...props}
        />
        {/* {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>} */}
        {error && <span className="text-red-500 text-xs">{error.message}*</span>}
      </div>
    );
  }
);

export default CustomInput;
