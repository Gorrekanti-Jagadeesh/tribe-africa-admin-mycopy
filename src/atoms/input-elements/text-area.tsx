import React from 'react';

export const Textarea: React.FC<{
  value: string | number | null;
  name: string;
  onChange: (value: string | number) => void;
  placeholder: string;
  error?: string;
  className?: string;
  required?: boolean;
  props: React.HTMLAttributes<HTMLTextAreaElement>;
}> = ({ value, name, onChange, placeholder, error, className, required, ...props }) => (
  <div className={`relative ${className}`}>
    <textarea
      placeholder={placeholder}
      value={value}
      name={name}
      {...props}
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      className={`p-2 block w-full bg-transparent border outline-none rounded-md focus:border-orange-500
        ${error ? 'border-red-500 ' : 'border-gray-400 '}`}
      required={required}
    />
    {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>}
  </div>
);
