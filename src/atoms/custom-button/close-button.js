import { jsx as _jsx } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const Close = ({ theme = 'dark', size = '6', className, onClick, ...buttonProps }) => {
  return _jsx('button', {
    ...buttonProps,
    className: `
        rounded-full w-${size} h-${size}
        ${theme === 'light' ? 'bg-slate-200 text-black' : ''}
        ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}
        ${className}
      `,
    onClick: onClick,
    children: _jsx(FontAwesomeIcon, { icon: faClose }),
  });
};
export default Close;
