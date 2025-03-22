import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import spiralBackground from '@assets/branding-bg-dark.png';
import { TribeAfrica } from '@atoms/common/internal-logo';
import { Loading } from '@atoms/common/loading';
import HeroSection from './hero-section';
import { sanityImageUrlBuilder } from '@api/index';
const Explore = ({ data, loading, error }) => {
  // const { t } = useTranslation();
  if (loading) {
    return _jsx(Loading, {});
  }
  if (error) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  return _jsxs(_Fragment, {
    children: [
      _jsx(HeroSection, { video: data?.video, image: sanityImageUrlBuilder(data?.image).url() }),
      _jsx('div', {
        className: 'relative bg-cover bg-center text-white p-2 md:p-4',
        style: { backgroundImage: `url(${spiralBackground})` },
        children: _jsxs('span', {
          className: 'm-auto my-4 max-w-6xl grid md:flex gap-4 md:gap-8 lg:gap-28',
          children: [
            _jsxs('div', {
              id: 'welcome-content',
              className: 'grid gap-8 animate-on-scroll',
              children: [
                _jsxs('h4', {
                  className: 'text-4xl',
                  children: [
                    'Explore Africa For ',
                    _jsx('br', {}),
                    _jsxs('span', {
                      className: 'text-6xl',
                      children: [
                        _jsx('span', { className: 'font-serif text-orange-500', children: 'Business' }),
                        ' & Tourism',
                      ],
                    }),
                  ],
                }),
                _jsx('div', {
                  id: 'about-africa',
                  className: 'grid gap-2 text-sm',
                  children: data.exploreSectionContent.map((each, index) => _jsx('p', { children: each }, index)),
                }),
                _jsx('div', {
                  id: 'welcome-footer',
                  className: 'text-sm flex gap-2',
                  children: _jsxs('span', {
                    className: 'flex flex-wrap',
                    children: [
                      'join ',
                      _jsx(TribeAfrica, { className: 'mx-1.5' }),
                      ' and be a part of the future. welcome to the tribe.',
                    ],
                  }),
                }),
              ],
            }),
            _jsxs('div', {
              className: 'flex gap-3 md:flex-col m-auto md:max-w-96 animate-on-scroll',
              children: [
                _jsxs('div', {
                  className: 'flex gap-3 w-2/3 md:w-full',
                  children: [
                    _jsx('div', {
                      className: 'w-1/2 h-full aspect-square md:aspect-auto',
                      children: _jsx('img', {
                        src: sanityImageUrlBuilder(data?.exploreSectionImages[0]).url(),
                        alt: 'Person in suit',
                        className: 'w-full h-full object-cover rounded-lg shadow-lg',
                      }),
                    }),
                    _jsx('div', {
                      className: 'w-1/2 h-full aspect-square md:aspect-auto',
                      children: _jsx('img', {
                        src: sanityImageUrlBuilder(data?.exploreSectionImages[1]).url(),
                        alt: 'Person in suit',
                        className: 'w-full h-full object-cover rounded-lg shadow-lg',
                      }),
                    }),
                  ],
                }),
                _jsx('div', {
                  className: 'w-1/3 md:w-full',
                  children: _jsx('img', {
                    src: sanityImageUrlBuilder(data?.exploreSectionImages[2]).url(),
                    alt: 'Person on boat',
                    className: 'w-full h-full object-cover rounded-lg shadow-lg',
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
export default Explore;
