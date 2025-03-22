import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Close from '@atoms/custom-button/close-button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
const DroppingNav = ({ id, title, content }) => {
  const [open, setOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setOpen(false),
  });
  return _jsxs('div', {
    ref: ref,
    id: id,
    className: 'md:m-auto h-full w-full flex-1',
    onClick: () => setOpen(true),
    children: [
      _jsxs('span', {
        className:
          'flex gap-1.5 h-full w-full md:justify-center md:items-center cursor-pointer text-white md:text-black',
        children: [title, _jsx(FontAwesomeIcon, { icon: faChevronDown, className: 'w-3' })],
      }),
      _jsxs('div', {
        className: `fixed md:absolute h-screen md:h-auto left-0 top-0 md:top-auto w-full overflow-auto bg-black text-white md:rounded z-20 transition-all duration-200 ease-in
          ${open ? 'max-h-screen p-2 border-2 border-orange-500' : 'max-h-0'}`,
        children: [
          _jsx(Close, {
            className: 'ms-auto block md:hidden',
            theme: 'light',
            size: '6',
            onClick: (e) => {
              e.stopPropagation();
              setOpen(false);
            },
          }),
          content,
        ],
      }),
    ],
  });
};
export default DroppingNav;
