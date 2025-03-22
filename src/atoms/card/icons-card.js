import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const IconsCard = ({ data, onClick }) => {
  return _jsx('div', {
    className: 'w-full cursor-pointer',
    onClick: onClick,
    children: _jsxs(
      'div',
      {
        className: 'flex flex-col items-center p-2 cursor-pointer',
        children: [data.icon, _jsx('p', { children: data.label })],
      },
      data.label
    ),
  });
};
export default IconsCard;
