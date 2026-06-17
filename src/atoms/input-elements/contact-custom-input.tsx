import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import CustomInput from './custom-input';

interface MobileNumberInputProps<T> {
  errors: [FieldError | undefined, FieldError | undefined];
  countryCodes: { label: string; value: string }[];
  customSelectClasses?: string;
  phoneName?: Path<T>;
  countryCodeName?: Path<T>;
  phonePlaceholder?: string;
  label?: string;
  register: UseFormRegister<T>;
  required?: boolean;
}

const MobileNumberInput = <T,>({
  errors,
  countryCodes,
  phoneName = 'phone' as Path<T>,
  countryCodeName = 'countryCode' as Path<T>,
  phonePlaceholder = 'Contact Number',
  label = 'Contact Number for Enquiries',
  customSelectClasses,
  required = true,
  register,
}: MobileNumberInputProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold">
          {label}
          {required && <span className="text-red-500 text-sm">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 mt-5">
          <select
            {...register(countryCodeName, { required: 'Country code is required' })}
            className={`p-2 text-sm block h-16 w-fit bg-transparent border outline-none rounded-md focus:border-brand-orange
          ${errors[0] ? 'border-red-500' : 'border-gray-400'} ${customSelectClasses}`}
          >
            <option value="" disabled selected>
              Country Code
            </option>
            {countryCodes.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label} ({country.value})
              </option>
            ))}
          </select>
          {errors[0] && <span className="text-red-500 text-xs">{errors[0]?.message}*</span>}
        </div>

        <CustomInput
          {...register(phoneName, {
            required: 'Contact Number is required',
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: 'Please enter a valid phone number',
            },
          })}
          customInputClassNames="w-64"
          placeholder={phonePlaceholder}
          error={errors[1]}
          type="tel"
        />
      </div>
    </div>
  );
};

export default MobileNumberInput;
