import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Footer from '../../molecules/footer';
import { HolidayHeader } from '../../molecules/header';
import MapChart from '../../molecules/maps/map';
import DualHeading from '@atoms/heading/dual-heading';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import OverLayCard from '@atoms/card/overlay-card';
import { sanityImageUrlBuilder } from '@api/index';
import ColsGrid from '@molecules/layout/cols-grid';
import { CountriesGeoData } from '@data/index';
const HolidayScreen = ({ props }) => {
  const {
    country,
    weatherData,
    weatherLoading,
    weatherError,
    landingData,
    landingError,
    landingLoading,
    lookOutForData,
    lookOutForLoading,
    lookOutForError,
    mapsData,
    mapsError,
    mapsLoading,
    adventuresData,
    adventuresLoading,
    adventuresError,
    tribeGoesOutData,
    tribeGoesOutLoading,
    tribeGoesOutError,
  } = props;
  if (!country || !CountriesGeoData[country]) {
    return _jsx('div', { children: 'Country data not available' });
  }
  if (
    landingLoading ||
    weatherLoading ||
    lookOutForLoading ||
    mapsLoading ||
    adventuresLoading ||
    tribeGoesOutLoading
  ) {
    return 'Loading';
  }
  if (
    landingError ||
    !landingData ||
    weatherError ||
    !weatherData ||
    lookOutForError ||
    !lookOutForData ||
    mapsError ||
    !mapsData ||
    adventuresError ||
    !adventuresData ||
    tribeGoesOutError ||
    !tribeGoesOutData
  ) {
    return 'Error Loading page..';
  }
  return _jsxs('div', {
    children: [
      _jsx(HolidayHeader, { country: country }),
      _jsxs('div', {
        children: [
          _jsxs('div', {
            className: 'max-w-6xl m-auto p-4',
            children: [
              _jsx('div', {
                className: '',
                children: _jsxs('div', {
                  className: 'relative',
                  children: [
                    _jsx('div', {
                      className: 'aspect-video bg-cover rounded-md w-full brightness-50',
                      style: {
                        backgroundImage: `url(${sanityImageUrlBuilder(landingData.holidayLanding)})`,
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
              _jsx(DualHeading, { className: 'mb-4', children: 'Let the *Adventure* begin' }),
              _jsx(CommonCarousel, {
                data: adventuresData,
                component: (item) => _jsx(OverLayCard, { data: { ...item, title: 'Excursions Coming Soon' } }),
              }),
            ],
          }),
          _jsxs('div', {
            className: 'max-w-6xl m-auto p-4 animate-on-scroll',
            children: [
              _jsx(DualHeading, { children: 'Things to *Look Out* For!' }),
              _jsx('div', {
                className: 'mt-4',
                children: _jsx(ColsGrid, {
                  cols: 3,
                  gap: 3,
                  children: lookOutForData.map((each) => _jsx(OverLayCard, { data: each }, each._id)),
                }),
              }),
            ],
          }),
          _jsx(MapChart, { country: country, data: mapsData }),
          _jsxs('div', {
            className: 'max-w-6xl m-auto p-4',
            children: [
              _jsx(DualHeading, { className: 'mb-4', children: 'When the *Tribe* goes out!' }),
              _jsx(CommonCarousel, { data: tribeGoesOutData, component: (item) => _jsx(OverLayCard, { data: item }) }),
            ],
          }),
        ],
      }),
      _jsx(Footer, {}),
    ],
  });
};
export default HolidayScreen;
