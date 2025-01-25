import { forwardRef, useState } from 'react';

export const CustomSelect = forwardRef<
  HTMLSelectElement,
  {
    options: { label: string; value: string | number }[];
    name?: string;
    placeholder: string;
    error?: string;
    className?: string;
    required?: boolean;
    props?: React.HTMLAttributes<HTMLSelectElement>;
  }
>(({ options, name, placeholder, error, className, required, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);

  return (
    <div className={`relative ${className}`}>
      <select
        ref={ref}
        name={name}
        required={required}
        onFocus={handleFocus}
        {...props}
        className={`p-2 block w-full bg-transparent border outline-none rounded-md focus:border-orange-500 
          ${error ? 'border-red-500' : 'border-gray-400'}  appearance-none`}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={name}
        className={`absolute duration-300 top-2.5 left-2.5 origin-0 z-10 bg-white transition-all cursor-text
          ${isFocused ? '-translate-y-5 scale-75 text-sm text-orange-500 px-2 left-0' : 'text-gray-400'}`}
      >
        {placeholder}
      </label>
      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600"
        aria-hidden="true"
      >
        ▼
      </span>
      {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>}

      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600"
        aria-hidden="true"
      >
        ▼
      </span>
      {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>}
    </div>
  );
});
