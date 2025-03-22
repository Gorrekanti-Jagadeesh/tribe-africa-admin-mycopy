import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Close from '@atoms/custom-button/close-button';
const Modal = ({ isOpen, setIsOpen, containerClasses, trigger, customClasses, closeButtonClasses, children }) => {
  return _jsxs('div', {
    className: `inline-block ${containerClasses}`,
    children: [
      trigger && _jsx('span', { onClick: () => setIsOpen(true), className: 'cursor-pointer', children: trigger }),
      isOpen &&
        _jsx('div', {
          className: 'fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-50 flex justify-center items-center',
          onClick: () => setIsOpen(false),
          children: _jsx('div', {
            className: 'w-full h-full py-4 overflow-auto bg-transparent',
            children: _jsxs('div', {
              className: `relative max-w-5xl m-auto ${customClasses}`,
              onClick: (e) => e.stopPropagation(),
              children: [
                _jsx(Close, {
                  className: `m-2 absolute top-0 right-0 ${closeButtonClasses}`,
                  size: `8`,
                  theme: 'light',
                  onClick: () => setIsOpen(false),
                }),
                _jsx('span', { className: 'z-0', children: children }),
              ],
            }),
          }),
        }),
    ],
  });
};
export default Modal;
