import { jsx as _jsx } from 'react/jsx-runtime';
const Button = ({ title, type = 'button', disabled = false, onClick, children, className, style, ...props }) => {
  return _jsx('button', {
    className: `border bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black hover:border hover:border-orange-400 duration-300 disabled:bg-gray-500 ${className}`,
    type: type,
    onClick: onClick,
    style: style,
    ...props,
    title: title,
    disabled: disabled,
    children: children,
  });
};
export default Button;
