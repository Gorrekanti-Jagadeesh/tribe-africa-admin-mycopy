import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React from 'react';
// Use React.forwardRef to forward the ref to the input element
const Checkbox = React.forwardRef(({ label, onChange, require = false, ...props }, ref) => {
  const inputId = `checkbox-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID for the checkbox
  return _jsxs('div', {
    className: 'flex items-center mt-2',
    children: [
      _jsx('input', {
        required: require,
        type: 'checkbox',
        onChange: (e) => onChange(e.target.checked),
        className: 'mr-2',
        id: inputId,
        ref: ref,
        ...props,
      }),
      _jsx('label', { htmlFor: inputId, children: label }),
    ],
  });
});
export default Checkbox;
