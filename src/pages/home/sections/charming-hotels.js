import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Modal from '@molecules/modal';
import DualHeading from '@atoms/heading/dual-heading';
import { Loading } from '@atoms/common/loading';
import OverLayCard from '@atoms/card/overlay-card';
const CharmingHotels = ({ data, loading, error }) => {
  const [content, setContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  if (loading) return _jsx(Loading, {});
  if (error) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  const HotelView = ({ data }) => {
    return _jsxs('div', {
      id: 'hotel-view',
      className: 'grid justify-center md:flex gap-4 p-2 md:p-4 my-4',
      children: [
        _jsx('div', {
          id: 'collage',
          className: 'flex md:grid md:grid-cols-2 gap-4 md:w-4/6 max-w-xl overflow-auto',
          children: data.images.map((image, idx) =>
            _jsx(
              'img',
              {
                src: image.asset.url,
                alt: `Hotel Image ${idx}`,
                className: 'aspect-square w-full m-auto rounded-lg min-w-60 md:min-w-0',
              },
              idx
            )
          ),
        }),
        _jsxs('div', {
          id: 'hotel-content',
          className: 'flex flex-grow flex-col',
          children: [
            _jsx('h3', { className: 'font-bold text-lg', children: data.name }),
            _jsx('p', { className: 'm-0 p-0 text-sm text-slate-100', children: data.country }),
            _jsxs('div', {
              className: 'my-4',
              children: [
                _jsxs('p', { children: ['Address: ', data.address] }),
                _jsxs('p', { children: ['Phone: ', data.phone] }),
                _jsxs('p', { children: ['Email: ', data.email] }),
                _jsxs('p', { children: ['Website: ', data.website] }),
              ],
            }),
            _jsx('button', {
              className: 'bg-gray-300 p-4 px-6 text-black ms-auto mt-auto w-fit',
              children: 'Book Hotel',
            }),
          ],
        }),
      ],
    });
  };
  return _jsxs('div', {
    className: 'max-w-6xl m-auto p-2 md:p-4 my-4',
    children: [
      _jsx(DualHeading, { children: 'Charming *Hotels*' }),
      _jsx(CommonCarousel, {
        data: data
          .filter((each) => each.isCharmingHotel)
          .map((item, index) => {
            return {
              image: item.images[0].asset.url, // Get the URL as a string
              title: item.name,
              onClick: () => {
                setContent(data[index]);
                setIsOpen(true);
              },
            };
          }),
        component: (item) => _jsx(OverLayCard, { data: item }),
      }),
      content &&
        _jsx(Modal, {
          isOpen: isOpen,
          setIsOpen: setIsOpen,
          customClasses: 'bg-gray-900 text-white rounded-md border-2 border-orange-500',
          children: _jsx(HotelView, { data: content }),
        }),
    ],
  });
};
export default CharmingHotels;
