import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const TribeAfricaPagesCard = ({ image, content, footer, onClick, className }) => {
  return _jsxs('div', {
    className: `w-full grid grid-cols-1 ${footer ? 'md:grid-cols-2' : 'md:grid-cols-1'} border border-gray-500 rounded-md p-2 my-4 cursor-pointer ${className}`,
    onClick: onClick,
    children: [
      _jsxs('div', {
        className: `flex flex-col md:flex-row md:w-full`,
        children: [
          _jsx('div', {
            className: `${footer ? 'md:w-2/5' : 'md:w-2/5'}`,
            children: _jsx('img', { src: image, alt: 'default', className: 'w-full aspect-square rounded-md' }),
          }),
          _jsx('div', { className: `md:w-${footer ? '3/5' : 'full'} md:ml-2`, children: content }),
        ],
      }),
      footer && _jsx('div', { className: 'md:w-1/2 ml-auto flex items-center', children: footer }),
    ],
  });
};
export default TribeAfricaPagesCard;
