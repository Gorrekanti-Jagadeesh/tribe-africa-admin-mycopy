import Dropdown from '@atoms/dropdown/dropdown-search';
import React, { useEffect, useState, useRef } from 'react';
import { RichTextEditor } from './rich-text-editor';
import { InputProps } from '../../types/index';

const Input: React.FC<InputProps> = ({
  type,
  defaultValue,
  placeholder = 'Provide input',
  options,
  action,
  required = true,
  className,
  name,
  regex,
  errorMessage = 'This field is required',
  patternMessage,
  maxLength,
  minLength,
}) => {
  const [value, setValue] = useState<string | number | null>(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Only trigger effect on subsequent renders
  useEffect(() => {
    if (action) {
      action(value ?? defaultValue);
    }

    setError(null);

    if (required && touched && !value) {
      setError(errorMessage);
    } else if (regex && touched && value && !regex.test(String(value))) {
      setError(patternMessage || 'Invalid format');
    } else if (minLength && touched && value && String(value).length < minLength) {
      setError(`Minimum length is ${minLength}`);
    } else if (maxLength && touched && value && String(value).length > maxLength) {
      setError(`Maximum length is ${maxLength}`);
    }
  }, [value]);

  const handleBlur = () => {
    setTouched(true);
  };

  let inputElement: JSX.Element;

  if (type === 'rich-text') {
    inputElement = <RichTextEditor onContentChange={action} />;
  } else if (type === 'select' || type === 'dropdown') {
    inputElement = (
      <Dropdown
        ref={dropdownRef}
        searchable={false}
        placeholderText={placeholder}
        action={setValue}
        options={options}
        buttonStyles={`p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500
          ${error ? 'border-red-500 ' : 'border-gray-400 '}
          ${className}
          `}
      />
    );
  } else if (type === 'text-area') {
    inputElement = (
      <textarea
        ref={inputRef}
        id={name}
        placeholder=""
        value={value}
        onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        onBlur={handleBlur}
        className={`p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500
          ${error ? 'border-red-500 ' : 'border-gray-400 '}
          ${className}
          `}
        required={required}
      />
    );
  } else {
    inputElement = (
      <input
        ref={inputRef}
        id={name}
        type={type}
        placeholder=""
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onBlur={handleBlur}
        className={`p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500
          ${error ? 'border-red-500 ' : 'border-gray-400 '}
          ${className}
          `}
        required={required}
      />
    );
  }

  return (
    <div
      ref={dropdownRef.current ? dropdownRef.current.ref : null}
      className={`${className} relative group my-2`}
      onClick={() => {
        if (type == 'rich-text') return;
        else if (type == 'select' || type == 'dropdown') {
          dropdownRef.current.triggerDropdown();
        } else {
          inputRef.current.focus();
        }
      }}
    >
      <label
        htmlFor={name}
        className={`absolute duration-300 top-3 left-2.5 origin-0 z-10 bg-white transition-all cursor-text
          ${(typeof value == 'string' ? value.length : value) ? '-translate-y-6 scale-75 text-sm text-orange-500 px-2 left-0' : ''}
        `}
      >
        {placeholder}
      </label>

      {inputElement}

      {error && <span className="absolute text-red-500 text-xs bottom-1 right-1">{error}</span>}
    </div>
  );
};

export default Input;
