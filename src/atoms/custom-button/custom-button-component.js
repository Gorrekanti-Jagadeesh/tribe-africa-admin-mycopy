import { jsx as _jsx } from 'react/jsx-runtime';
const Button = ({ children }) => {
  return _jsx('button', {
    className: 'bg-[#FF6600] text-white font-bold py-2 px-4 rounded focus:outline-none',
    children: children,
  });
};
export default Button;
