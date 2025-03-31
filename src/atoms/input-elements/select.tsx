import { forwardRef, useState, useEffect } from 'react';

export const Select = forwardRef<
  HTMLSelectElement,
  {
    options: { label: string; value: string | number }[];
    name?: string;
    onChange?: (value: string | number) => void;
    placeholder: string;
    error?: string;
    className?: string;
    required?: boolean;
    formType?: string; // Accept formType as a prop
    value?: string | number; // Accept value as a prop
    props?: React.HTMLAttributes<HTMLSelectElement>;
  }
>(({ options, name, onChange, placeholder, error, className, required, formType, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = useState<string | number | ''>('');

  // Reset selected value when formType changes
  useEffect(() => {
    setSelectedValue('');
  }, [formType]);

  return (
    <div className={`relative ${className}`}>
      <select
        ref={ref}
        name={name}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        required={required}
        {...props}
        className={`p-2 block w-full bg-transparent border outline-none rounded-md focus:border-orange-500 
          ${error ? 'border-red-500' : 'border-gray-400'} appearance-none`}
      >
        <option value="" disabled>
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
        className={`absolute duration-300 top-3 left-2.5 origin-0 z-10 bg-white transition-all cursor-text
          ${selectedValue ? '-translate-y-5 scale-75 text-sm text-orange-500 px-2 left-0' : ''}`}
      >
        {placeholder}
      </label>
      {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>}
    </div>
  );
});
