import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface MobileNumberInputProps {
  register: UseFormRegister<any>;
  errors: [FieldError, FieldError];
  countryCodes: { label: string; value: string }[];
  phoneName?: string;
  countryCodeName?: string;
  phonePlaceholder?: string;
  label?: string;
  required?: boolean;
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  register,
  errors,
  countryCodes,
  phoneName = 'phone',
  countryCodeName = 'countryCode',
  phonePlaceholder = 'Contact Number',
  label = 'Contact Number for Enquiries',
  required = true,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold">
          {label}
          {required && <span className="text-red-500 text-sm"> *</span>}
        </label>
      )}
      <div className="flex">
        <select
          {...register(countryCodeName, { required: 'Country code is required' })}
          className={`p-2 w-40 border rounded ${errors[countryCodeName] ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Country's Code</option>
          {countryCodes.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label} ({country.value})
            </option>
          ))}
        </select>
        <input
          {...register(phoneName, {
            required: 'Contact Number is required',
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: 'Please enter a valid phone number',
            },
          })}
          type="tel"
          placeholder={phonePlaceholder}
          className={`p-2 border rounded w-full ${errors[phoneName] ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>
      {errors[0] && <span className="text-red-500 text-xs">{errors[0]?.message}*</span>}
      {errors[1] && <span className="text-red-500 text-xs">{errors[1]?.message}*</span>}
    </div>
  );
};

export default MobileNumberInput;
