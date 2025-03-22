import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import Footer from '@molecules/footer';
import { BusinessHeader } from '@molecules/header';
import DualHeading from '@atoms/heading/dual-heading';
import ColsGrid from '@molecules/layout/cols-grid';
import OverLayCard from '@atoms/card/overlay-card';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Button from '@atoms/custom-button/button';
import useScreenWidth from '@hooks/useScreenWidth';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase, toKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';
const BusinessScreen = ({ props }) => {
  const {
    navigate,
    country,
    landingData,
    landingError,
    landingLoading,
    weatherData,
    weatherLoading,
    weatherError,
    agencyData,
    agencyLoading,
    agencyError,
    investmentData,
    investmentError,
    investmentLoading,
    naturalResourcesData,
    naturalResourcesLoading,
    naturalResourcesError,
    eventsData,
    eventsLoading,
    eventsError,
    professionalServicesData,
    professionalServicesLoading,
    professionalServicesError,
  } = props;
  const [layout, setLayout] = useState(3);
  const screenWidth = useScreenWidth();
  useEffect(() => {
    if (screenWidth < 1024) {
      setLayout(2);
    } else {
      setLayout(3);
    }
  }, [screenWidth]);
  if (
    landingLoading ||
    investmentLoading ||
    weatherLoading ||
    naturalResourcesLoading ||
    professionalServicesLoading ||
    eventsLoading ||
    agencyLoading
  ) {
    return _jsx(Loading, {});
  }
  if (
    landingError ||
    !landingData ||
    investmentError ||
    !investmentData ||
    weatherError ||
    !weatherData ||
    naturalResourcesError ||
    !naturalResourcesData ||
    eventsError ||
    !eventsData ||
    professionalServicesError ||
    !professionalServicesData ||
    agencyError ||
    !agencyData
  ) {
    return 'Error Loading page..';
  }
  return _jsxs('div', {
    className: 'max-w-screen-2xl m-auto',
    children: [
      _jsx('div', {
        className: 'bg-orange-500 p-4 text-white text-xl text-center',
        children: _jsx('p', { children: 'Getting there - Book Flight and accommodation' }),
      }),
      _jsx(BusinessHeader, { country: country }),
      _jsx('div', {
        className: 'm-auto max-w-6xl p-4',
        children: _jsxs('div', {
          className: 'relative',
          children: [
            _jsx('div', {
              className: 'aspect-video bg-cover rounded-md w-full brightness-50',
              style: {
                backgroundImage: `url(${sanityImageUrlBuilder(landingData.businessLanding)})`,
              },
            }),
            _jsxs('div', {
              className:
                'text-white text-sm md:text-base lg:text-lg flex flex-col gap-2 lg:gap-6 p-2 md:p-4 lg:p-8 absolute bottom-0 brightness-200',
              children: [
                _jsxs('p', {
                  children: [
                    'Weather:',
                    ' ',
                    weatherLoading
                      ? 'Loading...'
                      : weatherData
                        ? `${weatherData.temperature} °F / ${weatherData.condition}`
                        : 'No data available',
                  ],
                }),
                _jsxs('p', { children: ['Internet speed: ', landingData.internetSpeed] }),
                _jsxs('p', { children: ['Time: ', weatherData ? weatherData.time : 'Loading...'] }),
              ],
            }),
          ],
        }),
      }),
      _jsxs('div', {
        className: 'max-w-6xl m-auto p-4',
        children: [
          _jsx(DualHeading, { children: `Key *Investment Sectors* in ${landingData.country}` }),
          _jsx('p', {
            className: 'mb-4 text-sm',
            children: 'Including endless opportunities for small and medium enterprises (SMEs) across all sectors',
          }),
          _jsx(ColsGrid, {
            cols: layout,
            children: investmentData.map((item) => _jsx(OverLayCard, { data: item }, item._id)),
          }),
        ],
      }),
      _jsx('div', {
        className: 'w-full bg-black text-white',
        children: _jsxs('div', {
          className: 'max-w-6xl m-auto p-2 md:p-4 py-8',
          children: [
            _jsxs('h2', {
              className: 'text-lg md:text-4xl',
              children: [
                'For more information on ',
                _jsx('span', { className: 'text-orange-500', children: 'Investment' }),
                ' in ',
                fromKebabCase(country),
              ],
            }),
            _jsxs('div', {
              className: 'flex flex-col md:flex-row gap-2 mt-3',
              children: [
                _jsx('img', {
                  className: 'md:w-1/4 aspect-square h-auto rounded-md',
                  src: sanityImageUrlBuilder(agencyData.agencyLogo).url(),
                }),
                _jsxs('div', {
                  className: 'flex-grow space-y-2',
                  children: [
                    _jsx('h1', { className: 'font-semibold', children: agencyData.agencyName }),
                    _jsxs('h3', { className: 'font-semibold', children: ['Website: ', agencyData.agencyWebsite] }),
                    _jsxs('div', {
                      className: 'border border-white rounded-md p-2 text-sm',
                      children: [
                        _jsx('p', { className: 'font-semibold', children: 'Reviews:' }),
                        _jsx('ul', {
                          children: agencyData.agencyReviews.map((each, index) =>
                            _jsx('li', { children: each }, index)
                          ),
                        }),
                      ],
                    }),
                    _jsxs('p', {
                      className: 'text-right',
                      children: ['For more information: ', _jsx(Button, { children: 'Contact' })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      _jsxs('div', {
        className: 'max-w-6xl m-auto p-4',
        children: [
          _jsx(DualHeading, { children: 'Natural *Resources*' }),
          _jsx('p', {
            className: 'text-sm',
            children:
              "Committing to local beneficiation & enhancing the value addition of the continent's abundant resources",
          }),
          _jsx(CommonCarousel, { data: naturalResourcesData, component: (item) => _jsx(OverLayCard, { data: item }) }),
        ],
      }),
      _jsxs('div', {
        className: 'max-w-6xl m-auto p-4',
        children: [
          _jsx(DualHeading, { className: 'mb-4', children: 'Upcoming *Events*' }),
          _jsx(ColsGrid, {
            cols: layout,
            children: eventsData.map((item) =>
              _jsx(
                OverLayCard,
                {
                  data: {
                    ...item,
                    onClick: () => navigate(`/${country}/events/business/${toKebabCase(item.title)}`),
                  },
                },
                item._id
              )
            ),
          }),
        ],
      }),
      _jsxs('div', {
        className: 'max-w-6xl m-auto p-4',
        children: [
          _jsxs('div', {
            className: 'flex',
            children: [
              _jsx(DualHeading, { children: 'Professional *Services*' }),
              _jsx(Button, { className: 'ms-auto', children: 'Advertise your business' }),
            ],
          }),
          _jsx(CommonCarousel, {
            data: professionalServicesData,
            component: (item) => _jsx(OverLayCard, { data: item }),
          }),
        ],
      }),
      _jsx(Footer, {}),
    ],
  });
};
export default BusinessScreen;
