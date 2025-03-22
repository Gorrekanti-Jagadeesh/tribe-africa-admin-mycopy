import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate, useParams } from 'react-router';
import { toKebabCase } from '@utils/common';
import EventForm from '@molecules/forms/event-form';
import Modal from '@molecules/modal';
import Button from '@atoms/custom-button/button';
import { useState } from 'react';
import OverLayCard from '@atoms/card/overlay-card';
const HolidayEventsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { country } = useParams();
  const navigation = useNavigate();
  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: ['holiday-events'],
    queryFn: () => sanity.GET(`*[_type == "event-categories" && category != "Business"]`),
  });
  if (eventsLoading) {
    return 'Loading...';
  }
  if (eventsError) {
    return 'An error occurred...';
  }
  return _jsxs('div', {
    className: 'p-2 md:p-3',
    children: [
      _jsxs('div', {
        className: 'flex flex-col md:justify-between md:flex-row md:items-center',
        children: [
          _jsx('h1', {
            className: 'text-lg text-orange-500 text-left font-semibold',
            children: '\u2192 Holiday Events',
          }),
          _jsx('div', { children: _jsx(Button, { onClick: () => setIsOpen(true), children: 'List your event' }) }),
        ],
      }),
      _jsxs('div', {
        className: 'grid grid-cols-2 md:grid-cols-4 w-full',
        children: [
          eventsData[0].subCategories.map((each) =>
            _jsx('div', {
              onClick: () => navigation(`/${country}/events/entertainment/${toKebabCase(each.title)}`),
              className: 'm-4',
              children: _jsx(OverLayCard, {
                data: {
                  title: each.title,
                  image: sanityImageUrlBuilder(each.subCategoryImage).url(),
                },
              }),
            })
          ),
          eventsData[1].subCategories.map((each) =>
            _jsx('div', {
              onClick: () => navigation(`/${country}/events/sports/${toKebabCase(each.title)}`),
              className: 'm-4',
              children: _jsx(OverLayCard, {
                data: {
                  title: each.title,
                  image: sanityImageUrlBuilder(each.subCategoryImage).url(),
                },
              }),
            })
          ),
        ],
      }),
      _jsx(Modal, { isOpen: isOpen, setIsOpen: setIsOpen, children: _jsx(EventForm, {}) }),
    ],
  });
};
export default HolidayEventsPage;
