import { jsx as _jsx } from 'react/jsx-runtime';
const PagesHeading = ({ children, className }) => {
  return _jsx('h1', {
    className: `flex-grow mb-4 pb-2 border-b-2 w-100 border-orange-500 text-4xl max-w-md ${className}`,
    children: children,
  });
};
export default PagesHeading;
