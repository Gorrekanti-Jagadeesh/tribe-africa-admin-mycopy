import React from 'react';

export const Textarea: React.FC<{
  name: string;
  placeholder: string;
  error?: string;
  className?: string;
  required?: boolean;
  props: React.HTMLAttributes<HTMLTextAreaElement>;
}> = ({ name, placeholder, error, className, required, ...props }) => (
  <div className={`relative ${className}`}>
    <textarea
      placeholder={placeholder}
      name={name}
      {...props}
      className={`p-2 block w-full bg-transparent border outline-none rounded-md focus:border-brand-orange
        ${error ? 'border-red-500 ' : 'border-gray-400 '}`}
      required={required}
    />
    {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>}
  </div>
);
