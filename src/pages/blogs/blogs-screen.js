import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import UnderlineHeading from '@atoms/heading/underline-heading';
import BlogCard from '../../atoms/card/blog-card';
import DualHeading from '../../atoms/heading/dual-heading';
import BlogCompose from '@molecules/blogs/blog-compose';
import Modal from '@molecules/modal';
const BlogPageScreen = ({ country, data, banner, blogCategory }) => {
  const [openModal, setOpenModal] = useState(false);
  return _jsx('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: _jsxs('div', {
      className: 'flex flex-col gap-4',
      children: [
        _jsxs('div', {
          id: 'header',
          className: 'flex mb-4',
          children: [
            _jsx(UnderlineHeading, { children: `${country} ${country && '-'} ${blogCategory} Articles` }),
            _jsx(Button, { className: 'ms-auto', children: 'Get Featured' }),
          ],
        }),
        _jsxs('div', {
          id: 'banner',
          className: 'bg-gray-100 flex justify-center p-12',
          children: [
            _jsx('img', { className: 'aspect-square max-w-80', src: banner }),
            _jsxs('div', {
              className: 'flex flex-col gap-4 bg-white p-4 max-h-48 my-auto relative right-4',
              children: [
                _jsx('h4', { className: 'text-lg font-semibold', children: 'Top Businesses in 2024' }),
                _jsx('div', {
                  className: 'overflow-auto flex flex-col gap-2',
                  children: [1, 2, 3, 4, 5].map((item, index) => _jsx('p', { children: item }, index)),
                }),
              ],
            }),
          ],
        }),
        _jsxs('div', {
          className: 'max-w-6xl w-full m-auto',
          children: [
            _jsxs('div', {
              className: 'flex w-full',
              children: [
                _jsx(DualHeading, { children: 'Recent Articles' }),
                _jsx(Modal, {
                  isOpen: openModal,
                  setIsOpen: setOpenModal,
                  containerClasses: 'ms-auto',
                  trigger: _jsx('button', {
                    onClick: () => setOpenModal(true),
                    className: 'ms-auto underline',
                    children: 'write a blog',
                  }),
                  customClasses: 'w-full',
                  children: _jsx(BlogCompose, { className: 'bg-white overflow-auto p-4 rounded-lg' }),
                }),
              ],
            }),
            _jsx('div', {
              className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto',
              children: data.map((item, index) => _jsx(BlogCard, { data: item }, index)),
            }),
          ],
        }),
      ],
    }),
  });
};
export default BlogPageScreen;
