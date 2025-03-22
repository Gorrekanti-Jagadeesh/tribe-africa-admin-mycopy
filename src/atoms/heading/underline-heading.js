import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const UnderlineHeading = ({ children, className, borderWidth = 'w-3/4' }) => {
  return _jsxs('div', {
    children: [
      _jsx('h1', { className: `flex-grow mb-4 pb-2 text-4xl ${className}`, children: children }),
      _jsx('div', { className: `border-b-2 border-orange-500 -mt-6 ${borderWidth}` }),
    ],
  });
};
export default UnderlineHeading;
