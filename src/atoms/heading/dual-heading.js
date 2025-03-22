import { jsx as _jsx } from 'react/jsx-runtime';
const DualHeading = ({ children, className }) => {
  const parts = children.split('*');
  return _jsx('h2', {
    className: `text-xl md:text-4xl ${className}`,
    children: parts.map((part, index) =>
      index % 2 === 1
        ? _jsx('span', { className: 'font-serif text-orange-500', children: part }, index)
        : _jsx('span', { children: part }, index)
    ),
  });
};
export default DualHeading;
