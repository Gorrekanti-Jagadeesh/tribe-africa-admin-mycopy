import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import DualHeading from '@atoms/heading/dual-heading';
import Button from '@atoms/custom-button/button';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
const Services = ({ data, loading, error }) => {
  if (!data || loading) {
    return _jsx(Loading, {});
  }
  if (error) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  return _jsxs('div', {
    className: 'space-y-2 mb-4 max-w-6xl m-auto p-2 md:p-4',
    children: [
      _jsxs('div', {
        className: 'flex',
        children: [
          _jsx(DualHeading, { children: 'Premier *Services*' }),
          _jsx(Button, { className: 'ms-auto', children: 'Advertise with Us' }),
        ],
      }),
      _jsx(CommonCarousel, {
        data: data,
        component: (services) =>
          _jsxs(
            'div',
            {
              className: '',
              children: [
                _jsx('div', {
                  className: 'border-2 border-gray-300 p-2 rounded',
                  style: { aspectRatio: '4/3' },
                  children: _jsx('div', {
                    className: 'relative bg-cover bg-center p-2 w-full h-full',
                    style: { backgroundImage: `url(${sanityImageUrlBuilder(services?.image).url()})` },
                  }),
                }),
                _jsxs('div', {
                  children: [
                    _jsx('h6', { className: 'font-semibold', children: services.service }),
                    _jsx('p', { className: 'text-sm', children: services.location }),
                  ],
                }),
              ],
            },
            services._id
          ),
      }),
      _jsx('div', {
        id: 'add-service',
        className: ' animate-on-scroll',
        children: _jsxs('div', {
          className: 'bg-black border-2 border-orange-500 rounded-md text-white text-center p-12 grid',
          children: [
            _jsx('h4', {
              className: ' text-lg font-bold mb-3',
              children: 'Want to List your business on Tribe Africa pages?',
            }),
            _jsx('p', {
              className: 'text-sm text-gray-200 mb-2',
              children: 'List your business and get massive traffic !',
            }),
            _jsx('button', {
              className: 'px-4 py-2 bg-orange-500 rounded-md text-white m-auto',
              style: { width: 'fit-content' },
              children: 'List your business',
            }),
          ],
        }),
      }),
    ],
  });
};
export default Services;
