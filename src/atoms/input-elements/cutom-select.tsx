import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

export const CustomSelect = forwardRef<
  HTMLSelectElement,
  {
    options: { label: string; value: string | number }[];
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder: string;
    error?: FieldError;
    containerClasses?: string;
    customInputClasses?: string;
    label?: string;
    required?: boolean;
    props?: React.HTMLAttributes<HTMLSelectElement>;
  }
>(
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

    return (
      <div className={`relative ${containerClasses}`}>
        {label && (
          <label className="static block mb-1 font-semibold">
            {label}
            {required && <span className="text-red-500 text-sm">*</span>}
          </label>
        )}
        <select
          ref={ref}
          name={name}
          onFocus={handleFocus}
          value={value}
          defaultValue={defaultValue}
          className={`p-2 text-sm block w-full h-10 bg-transparent border outline-none rounded-md focus:border-brand-orange
          ${error ? 'border-red-500' : 'border-gray-400'} appearance-none pr-8 ${customInputClasses}`}
          {...props}
        >
          <option value="" disabled selected={Boolean(!defaultValue)}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div>
          <label
            htmlFor={name}
            className={`absolute duration-300 top-10 text-sm left-2.5 origin-0 z-10 bg-white transition-all cursor-text
          ${isFocused ? '-translate-y-5 scale-75 text-brand-orange px-2 left-0' : 'text-gray-400'}`}
          >
            {placeholder}
          </label>
          <span className="absolute right-3 top-10 pointer-events-none text-gray-600 text-xs" aria-hidden="true">
            ▼
          </span>
        </div>
        {error && <span className="text-red-500 text-xs">{error.message}*</span>}
      </div>
    );
  }
);
