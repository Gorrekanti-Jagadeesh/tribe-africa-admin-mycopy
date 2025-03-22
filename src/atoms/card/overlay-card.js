import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import useScreenWidth from '@hooks/useScreenWidth';
import Modal from '@molecules/modal';
import { sanityImageUrlBuilder } from '@api/index';
const OverLayCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useScreenWidth();
  const handleClick = () => {
    if (screenWidth < 768 && data.description != undefined) {
      setIsOpen(true);
    }
  };
  return _jsxs('div', {
    children: [
      _jsxs('div', {
        className: 'w-full inline-block cursor-pointer group relative text-center',
        onClick: data.onClick ? data.onClick : handleClick,
        children: [
          _jsx('div', {
            className: 'aspect-square bg-cover rounded-md relative hover:border hover: border-orange-500',
            style: {
              backgroundImage: `url(${typeof data.image === 'string' ? data.image : sanityImageUrlBuilder(data.image)})`,
            },
            children:
              data.description != undefined &&
              _jsx(_Fragment, {
                children: _jsx('div', {
                  className: 'absolute top-0 left-0 right-0 bottom-0 opacity-0 md:group-hover:opacity-100',
                  children: _jsx('div', {
                    className:
                      'w-full h-full p-2 overflow-auto bg-black rounded-md flex justify-center items-center transition-opacity duration-300',
                    children: _jsx('div', { className: 'text-white', children: data.description }),
                  }),
                }),
              }),
          }),
          _jsx('p', { children: data.title }),
        ],
      }),
      _jsx(Modal, {
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        closeButtonClasses: 'hidden',
        children: _jsx('div', {
          className: ' w-full p-2 aspect-square overflow-auto bg-black rounded-md flex',
          children: _jsx('div', { className: 'text-white', children: data.description }),
        }),
      }),
    ],
  });
};
export default OverLayCard;
