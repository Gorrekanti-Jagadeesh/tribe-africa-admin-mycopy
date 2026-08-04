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
    const [focused, setFocused] = useState(false);

    const hasValue = value !== undefined && value !== null && value !== '';

    const isFloated = focused || hasValue;

    return (
      <div className={`${className} relative mt-5`}>
        {/* OUTER LABEL */}
        {label && (
          <label className="block mb-1 font-semibold text-sm sm:text-base">
            {label}
            {required && <span className="text-red-500 text-sm ml-1">*</span>}
          </label>
        )}

        {/* FLOATING LABEL */}
        <label
          className={`
    absolute left-3 px-1 bg-white pointer-events-none z-10
    transition-all duration-200 origin-left leading-tight

    ${isFloated ? 'top--1 text-xs text-brand-orange' : 'top-3 text-sm text-gray-400'}
  `}
          style={{
            maxWidth: 'calc(100% - 1.5rem)',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: 1.2,
          }}
        >
          {placeholder}
        </label>

        {/* INPUT */}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full border rounded-md px-3 pb-3
            pt-6 sm:pt-7
            outline-none transition
            focus:border-brand-orange
            text-sm sm:text-base

            ${error ? 'border-red-500' : 'border-gray-300'}
            ${customInputClassNames}
          `}
          {...props}
        />

        {/* ERROR */}
        {error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
      </div>
    );
  }
);

export default CustomInput;
