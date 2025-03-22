import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { PortableText } from '@portabletext/react';
import { getEntryDataById, sanityImageUrlBuilder } from '../../api';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import { FaGlobe, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { parseImageUrl } from '@/utils/sanity';
import { truncateText } from '@/utils/common';
const EventDetailsPage = () => {
  const { eventId } = useParams();
  const {
    data: eventDetails,
    error: eventDetailsError,
    isLoading: eventDetailsLoading,
  } = useQuery({
    queryKey: ['events-details-page'],
    queryFn: () => getEntryDataById(eventId),
  });
  if (eventDetailsLoading) {
    return _jsx(Loading, {});
  }
  if (eventDetailsError) {
    return 'Error Occurred';
  }
  return _jsxs('div', {
    className: 'flex flex-col gap-6 m-auto max-w-4xl px-10 md:px-0',
    children: [
      _jsx('h1', { className: 'text-3xl md:text-4xl font-semibold capitalize', children: eventDetails.title }),
      _jsx('img', {
        className: 'h-[50vh] w-full object-contain rounded-md',
        src: sanityImageUrlBuilder(eventDetails.coverPhoto).url(),
        alt: 'Event Cover',
      }),
      _jsxs('section', {
        children: [
          _jsx('h3', { className: 'text-2xl font-semibold mb-2', children: 'Description' }),
          _jsx(PortableText, {
            value: eventDetails.description,
            components: {
              types: {
                image: ({ value }) =>
                  _jsx('img', {
                    src: parseImageUrl(value.asset._ref),
                    alt: value.alt || 'Blog Image',
                    height: 100,
                    width: 100,
                  }),
              },
            },
          }),
        ],
      }),
      _jsxs('div', {
        className: 'flex flex-col md:flex-row justify-around',
        children: [
          _jsxs('div', {
            className: ' text-gray-700 text-lg mt-4 space-y-4',
            children: [
              _jsxs('div', {
                className: 'flex items-center gap-3',
                children: [
                  _jsx('img', {
                    src: sanityImageUrlBuilder(eventDetails.businessPhoto).url(),
                    alt: 'Business',
                    className: 'h-20 w-20 rounded-xl object-cover border border-gray-300',
                  }),
                  _jsxs('p', {
                    className: 'text-lg',
                    children: ['By ', _jsx('strong', { children: eventDetails.eventBy })],
                  }),
                ],
              }),
              eventDetails.website &&
                _jsx('div', {
                  className: 'flex gap-3',
                  children: _jsxs('a', {
                    href: eventDetails.website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'flex gap-3',
                    children: [
                      _jsx(FaGlobe, { className: 'text-2xl' }),
                      _jsx('p', { children: truncateText(eventDetails.website, 40) }),
                    ],
                  }),
                }),
              eventDetails.phone &&
                _jsx('div', {
                  className: 'flex gap-3',
                  children: _jsxs('a', {
                    href: `tel:${eventDetails.phone}`,
                    className: 'flex gap-3',
                    children: [_jsx(FaPhone, { className: 'text-2xl' }), _jsx('p', { children: eventDetails.phone })],
                  }),
                }),
              eventDetails.whatsapp &&
                _jsx('div', {
                  className: 'flex gap-3',
                  children: _jsxs('a', {
                    href: `https://wa.me/${eventDetails.whatsapp}`,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'flex gap-3',
                    children: [
                      _jsx(FaWhatsapp, { className: 'text-2xl' }),
                      _jsx('p', { children: eventDetails.whatsapp }),
                    ],
                  }),
                }),
              eventDetails.email &&
                _jsx('div', {
                  className: 'flex gap-3',
                  children: _jsxs('a', {
                    href: `mailto:${eventDetails.email}`,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'flex gap-3',
                    children: [
                      _jsx(FaEnvelope, { className: 'text-2xl' }),
                      _jsx('p', { children: eventDetails.email }),
                    ],
                  }),
                }),
              eventDetails.location &&
                _jsxs('div', {
                  className: 'flex gap-3',
                  children: [
                    _jsx('a', {
                      href: `mailto:${eventDetails.location}`,
                      children: _jsx(FaLocationDot, { className: 'text-2xl' }),
                    }),
                    _jsx('p', { children: eventDetails.location }),
                  ],
                }),
            ],
          }),
          _jsxs('div', {
            children: [
              eventDetails.ticketPrices &&
                _jsxs('div', {
                  className: 'mt-6',
                  children: [
                    _jsx('h3', { className: 'text-xl font-bold', children: 'Ticket Prices' }),
                    _jsx(PortableText, {
                      value: eventDetails.ticketPrices,
                      components: {
                        types: {
                          image: ({ value }) =>
                            _jsx('img', {
                              src: parseImageUrl(value.asset._ref),
                              alt: value.alt || 'Blog Image',
                              height: 100,
                              width: 100,
                            }),
                        },
                      },
                    }),
                  ],
                }),
              _jsxs('div', {
                className: 'mt-6',
                children: [
                  _jsx('h3', { className: 'text-xl font-bold', children: 'Date & Time' }),
                  _jsx('p', { children: eventDetails.eventTimings }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mt-6',
        children: [
          _jsx('h3', { className: 'text-xl font-bold', children: 'About the Event' }),
          _jsx(PortableText, {
            value: eventDetails.aboutEvent,
            components: {
              types: {
                image: ({ value }) =>
                  _jsx('img', { src: parseImageUrl(value.asset._ref), alt: value.alt || 'Blog Image' }),
              },
            },
          }),
        ],
      }),
    ],
  });
};
export default EventDetailsPage;
