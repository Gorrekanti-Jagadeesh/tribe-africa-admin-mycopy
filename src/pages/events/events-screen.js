import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import UnderlineHeading from '@atoms/heading/underline-heading';
import Button from '@atoms/custom-button/button';
import Modal from '../../molecules/modal';
import EventForm from '../../molecules/forms/event-form';
import { useNavigate } from 'react-router';
import { sanityImageUrlBuilder } from '@api/index';
import { PortableText } from '@portabletext/react';
const EventsScreen = ({ heading, image, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsxs('div', {
        className: 'flex flex-col md:flex-row md:items-center my-3',
        children: [
          _jsx(UnderlineHeading, { className: 'font-bold', children: heading }),
          _jsx(Button, { className: 'md:ms-auto px-4', onClick: () => setIsOpen(true), children: 'List your event' }),
          _jsx(Modal, { isOpen: isOpen, setIsOpen: setIsOpen, children: _jsx(EventForm, {}) }),
        ],
      }),
      data && data.length
        ? _jsx('div', {
            className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto',
            children: data.map((item) =>
              _jsxs(
                'div',
                {
                  className: 'w-full inline-block cursor-pointer rounded-md overflow-hidden border',
                  onClick: () => navigation(`${item._id}`),
                  children: [
                    _jsx('div', {
                      className: 'aspect-video bg-cover group relative overflow-auto',
                      style: {
                        backgroundImage: `url(${sanityImageUrlBuilder(item.coverPhoto)})`,
                      },
                      children: _jsx('div', {
                        className:
                          'absolute top-0 left-0 right-0 bottom-0 bg-black hidden group-hover:flex p-2 items-center justify-center transition-opacity duration-300',
                        children: _jsx('div', {
                          className: 'text-white',
                          children: _jsx(PortableText, { value: item.description }),
                        }),
                      }),
                    }),
                    _jsxs('div', {
                      className: 'text-sm flex flex-col gap-2 m-2',
                      children: [
                        _jsx('p', { id: 'title', className: 'font-semibold text-lg', children: item.title }),
                        _jsxs('p', {
                          children: [_jsx('strong', { children: ' Date & Time:' }), ' ', item.eventTimings],
                        }),
                        _jsxs('p', { children: [_jsx('strong', { children: ' Location:' }), ' ', item.location] }),
                        _jsxs('p', { children: [_jsx('strong', { children: ' Country: ' }), item.country] }),
                        _jsxs('p', { children: [_jsx('strong', { children: ' Website:' }), ' ', item.website] }),
                        _jsxs('p', { children: [_jsx('strong', { children: 'Tel:' }), item.phone] }),
                        _jsxs('p', { children: [_jsx('strong', { children: 'Whats App:' }), item.whatsapp] }),
                        _jsx(Button, { children: item.amount }),
                      ],
                    }),
                  ],
                },
                item._id
              )
            ),
          })
        : _jsx('img', { src: image, className: 'aspect-video object-cover' }),
    ],
  });
};
export default EventsScreen;
