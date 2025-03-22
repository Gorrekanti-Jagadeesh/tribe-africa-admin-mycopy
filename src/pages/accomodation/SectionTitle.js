import { jsx as _jsx } from 'react/jsx-runtime';
const SectionTitle = ({ children, className = '' }) => {
  return _jsx('div', {
    className: `relative w-fit ${className}`,
    children: _jsx('h3', { className: 'text-lg font-semibold text-gray-900 mb-2 relative', children: children }),
  });
};
export default SectionTitle;
