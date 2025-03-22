import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import { LeftButton, RightButton } from '@molecules/carousel/common-carousel';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';
const BusinessFriendly = ({ data, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!data || loading) {
    return _jsx(Loading, {});
  }
  if (error) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  if (!data.length) return null;
  return _jsxs('div', {
    className: 'mx-auto w-full flex flex-col max-w-6xl p-2 md:p-4',
    children: [
      _jsxs('div', {
        className: 'ms-auto flex flex-col items-end',
        children: [
          _jsx(DualHeading, { children: 'Business *Friendly*' }),
          _jsx('p', { className: 'mt-2 text-sm text-gray-600', children: 'Great work-life balance' }),
        ],
      }),
      _jsxs('div', {
        className: 'relative flex sm:flex-col items-center',
        children: [
          _jsxs('div', {
            className: 'w-full flex flex-col md:flex-row relative items-center m-2 md:m-4',
            children: [
              _jsx('div', {
                className:
                  'absolute right-0 w-full h-full md:h-fit max-h-full md:w-3/5 md:mb-0 opacity-65 md:opacity-100 text-white bg-black md:text-black md:bg-white rounded-lg shadow-lg border border-orange-500',
                children: _jsxs('div', {
                  className: 'p-2 md:p-6 w-full h-full flex flex-col',
                  children: [
                    _jsxs('div', {
                      className: 'flex-grow max-h-48 h-full overflow-hidden',
                      children: [
                        _jsx('h2', { className: 'text-xl font-semibold mb-2', children: data[currentIndex].title }),
                        _jsx('p', {
                          className: 'md:text-gray-600 line-clamp-4',
                          children: data[currentIndex].description,
                        }),
                      ],
                    }),
                    _jsx('a', {
                      href: `blogs/${data[currentIndex]._id}`,
                      className: 'ms-auto text-blue-500',
                      children: 'Know more',
                    }),
                  ],
                }),
              }),
              _jsx('div', {
                className: ' w-full md:w-3/5 overflow-hidden rounded-lg shadow-lg -z-10',
                children: _jsx('img', {
                  src: sanityImageUrlBuilder(data[currentIndex].image).url(),
                  alt: data[currentIndex].title,
                  className: 'h-64 md:h-80 lg:h-96 w-full object-cover object-center',
                }),
              }),
            ],
          }),
          _jsx(LeftButton, { onClick: () => setCurrentIndex(currentIndex - 1), disabled: currentIndex === 0 }),
          _jsx(RightButton, {
            onClick: () => setCurrentIndex(currentIndex + 1),
            disabled: currentIndex === data.length - 1,
          }),
        ],
      }),
    ],
  });
};
export default BusinessFriendly;
