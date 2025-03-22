import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { LinkList } from '../layout/link-list';
import Button from '@atoms/custom-button/button';
import EventForm from '../forms/event-form';
import { useModalContext } from '../../context/modalContext';
const NavcategoryItem = ({ category }) =>
  _jsxs('div', {
    className: 'flex justify-between md:flex-col md:justify-start',
    children: [
      _jsx('div', {
        className: 'border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full',
        children: _jsx('img', {
          src: category.imageUrl,
          alt: category.title,
          className: 'w-full h-48 aspect-square object-cover',
        }),
      }),
      _jsx(LinkList, {
        heading: _jsx('h3', { className: 'text-lg md:text-xl font-semibold', children: category.title }),
        links: category.items,
        className: 'text-left order-1 md:order-2 w-1/2 md:w-full',
      }),
    ],
  });
const NavLayout = ({ eventCategories, showButton, navLayoutHeading }) => {
  const { setModalContent, setModalIsOpen } = useModalContext();
  useEffect(() => setModalContent(_jsx(EventForm, {})), [setModalContent]);
  return _jsxs('section', {
    className: 'flex flex-col p-2 md:p-3 max-w-6xl m-auto',
    children: [
      _jsxs('div', {
        className: 'text-lg flex flex-col items-center md:flex-row mb-5',
        children: [
          _jsxs('h4', {
            className: ' text-left text-orange-500 text-lg font-semibold',
            children: ['\u2192 ', navLayoutHeading],
          }),
          showButton &&
            _jsx(Button, {
              className: 'ms-auto',
              onClick: () => setModalIsOpen(true),
              children: 'Advertise on tribe africa',
            }),
        ],
      }),
      _jsx('div', {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
        children: eventCategories.map((category, index) => _jsx(NavcategoryItem, { category: category }, index)),
      }),
    ],
  });
};
export default NavLayout;
