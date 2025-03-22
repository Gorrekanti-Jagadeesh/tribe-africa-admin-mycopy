import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import CustomInput from './custom-input';
const MobileNumberInput = ({
  errors,
  countryCodes,
  phoneName = 'phone',
  countryCodeName = 'countryCode',
  phonePlaceholder = 'Contact Number',
  label = 'Contact Number for Enquiries',
  customSelectClasses,
  required = true,
  register,
}) => {
  return _jsxs('div', {
    className: 'flex flex-col gap-2',
    children: [
      label &&
        _jsxs('label', {
          className: 'font-semibold',
          children: [label, required && _jsx('span', { className: 'text-red-500 text-sm', children: '*' })],
        }),
      _jsxs('div', {
        className: 'flex gap-2',
        children: [
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsxs('select', {
                ...register(countryCodeName, { required: 'Country code is required' }),
                className: `p-2 text-sm block h-10 w-fit bg-transparent border outline-none rounded-md focus:border-orange-500
          ${errors[0] ? 'border-red-500' : 'border-gray-400'} ${customSelectClasses}`,
                children: [
                  _jsx('option', { value: '', disabled: true, selected: true, children: 'Country Code' }),
                  countryCodes.map((country) =>
                    _jsxs(
                      'option',
                      { value: country.value, children: [country.label, ' (', country.value, ')'] },
                      country.value
                    )
                  ),
                ],
              }),
              errors[0] && _jsxs('span', { className: 'text-red-500 text-xs', children: [errors[0]?.message, '*'] }),
            ],
          }),
          _jsx(CustomInput, {
            ...register(phoneName, {
              required: 'Contact Number is required',
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: 'Please enter a valid phone number',
              },
            }),
            customInputClassNames: 'w-64',
            placeholder: phonePlaceholder,
            error: errors[1],
            type: 'tel',
          }),
        ],
      }),
    ],
  });
};
export default MobileNumberInput;
