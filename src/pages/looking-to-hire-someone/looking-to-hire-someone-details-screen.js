import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import DualHeading from '@atoms/heading/dual-heading';
import ReviewCard from '@atoms/card/review-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { sanityImageUrlBuilder } from '@api/index';
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
const LookingToHireSomeoneDetailsScreen = ({ proffesionalPersonData }) => {
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsx(DualHeading, { className: 'font-bold', children: proffesionalPersonData.name }),
      _jsx(TribeAfricaPagesCard, {
        className: 'border-none',
        image: sanityImageUrlBuilder(proffesionalPersonData.proffessionalImage).url(),
        content: _jsxs('div', {
          className: 'mx-3',
          children: [
            _jsxs('p', { children: [_jsx('strong', { children: ' Role:' }), ' ', proffesionalPersonData.role] }),
            _jsxs('p', {
              children: [_jsx('strong', { children: ' Proffession: ' }), proffesionalPersonData.proffession],
            }),
            _jsxs('p', {
              children: [_jsx('strong', { children: ' Experience: ' }), proffesionalPersonData.experience],
            }),
            _jsxs('p', {
              children: [_jsx('strong', { children: 'Personal Statement: ' }), proffesionalPersonData.statement],
            }),
            _jsxs('div', {
              className: 'my-1',
              children: [
                _jsx('div', { children: _jsx('strong', { children: 'Languages:' }) }),
                _jsx('div', {
                  className: 'flex space-x-4',
                  children: proffesionalPersonData.languages.map((each) =>
                    _jsx('div', { className: 'bg-gray-200 px-4 py-2 rounded-lg', children: each })
                  ),
                }),
              ],
            }),
            _jsxs('div', {
              className: 'my-1',
              children: [
                _jsx('div', { children: _jsx('strong', { children: 'Skills & Expertise:' }) }),
                _jsx('div', {
                  className: 'flex space-x-4',
                  children: proffesionalPersonData.skills.map((each) =>
                    _jsx('div', { className: 'bg-gray-200 px-4 py-2 rounded-lg', children: each })
                  ),
                }),
              ],
            }),
            _jsxs('div', {
              className: 'my-1',
              children: [
                _jsx('div', { children: _jsx('strong', { children: 'Proffessional Certificates:' }) }),
                _jsx('div', {
                  className: 'flex space-x-4',
                  children: proffesionalPersonData.certificates.map((each) =>
                    _jsx('div', { className: 'bg-gray-200 px-4 py-2 rounded-lg', children: each })
                  ),
                }),
              ],
            }),
          ],
        }),
      }),
      _jsxs('div', {
        className: 'my-4',
        children: [
          _jsx('h2', { className: 'text-3xl font-semibold', children: 'Description' }),
          _jsx('p', { children: proffesionalPersonData.description }),
        ],
      }),
      _jsx('div', {
        className: 'my-4 space-y-2',
        children: _jsxs('div', {
          className: 'flex justify-around',
          children: [
            _jsxs('div', {
              className: 'space-y-2',
              children: [
                _jsx('h2', { className: 'text-3xl font-semibold', children: 'Contact Details' }),
                proffesionalPersonData.phoneNumber &&
                  _jsx('div', {
                    className: 'flex gap-3',
                    children: _jsxs('a', {
                      href: `tel:${proffesionalPersonData.phoneNumber}`,
                      className: 'flex gap-3',
                      children: [
                        _jsx(FaPhone, { className: 'text-2xl' }),
                        _jsx('p', { children: proffesionalPersonData.phoneNumber }),
                      ],
                    }),
                  }),
                proffesionalPersonData.email &&
                  _jsx('div', {
                    className: 'flex gap-3',
                    children: _jsxs('a', {
                      href: `mailto:${proffesionalPersonData.email}`,
                      className: 'flex gap-3',
                      children: [
                        _jsx(FaEnvelope, { className: 'text-2xl' }),
                        _jsx('p', { children: proffesionalPersonData.email }),
                      ],
                    }),
                  }),
                proffesionalPersonData.streetAddress &&
                  _jsxs('div', {
                    className: 'flex gap-3',
                    children: [
                      _jsx(FaLocationDot, { className: 'text-2xl' }),
                      _jsxs('p', {
                        children: [
                          proffesionalPersonData.streetAddress,
                          ', ',
                          _jsx('br', {}),
                          proffesionalPersonData.city,
                          ', ',
                          _jsx('br', {}),
                          proffesionalPersonData.region,
                          ', ',
                          _jsx('br', {}),
                          proffesionalPersonData.postalCode,
                          ', ',
                          _jsx('br', {}),
                          proffesionalPersonData.country,
                          ', ',
                          _jsx('br', {}),
                        ],
                      }),
                    ],
                  }),
                proffesionalPersonData.website &&
                  _jsx('div', {
                    className: 'flex gap-3',
                    children: _jsxs('a', {
                      href: proffesionalPersonData.website,
                      target: '_blank',
                      className: 'flex gap-3',
                      children: [
                        _jsx(FaGlobe, { className: 'text-2xl' }),
                        _jsx('p', { children: proffesionalPersonData.website }),
                      ],
                    }),
                  }),
              ],
            }),
            proffesionalPersonData.instagramUrl ||
            proffesionalPersonData.facebookUrl ||
            proffesionalPersonData.twitterUrl ||
            proffesionalPersonData.linkedinUrl
              ? _jsxs('div', {
                  className: 'space-y-2',
                  children: [
                    _jsx('h2', { className: 'text-3xl font-semibold', children: ' Social Media Links' }),
                    proffesionalPersonData.facebookUrl &&
                      _jsx('div', {
                        className: 'flex gap-3',
                        children: _jsxs('a', {
                          href: proffesionalPersonData.facebookUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className: 'flex gap-3',
                          children: [
                            _jsx(FaFacebook, { className: 'text-2xl' }),
                            _jsx('p', { children: proffesionalPersonData.facebookUrl }),
                          ],
                        }),
                      }),
                    proffesionalPersonData.instagramUrl &&
                      _jsx('div', {
                        className: 'flex gap-3',
                        children: _jsxs('a', {
                          href: proffesionalPersonData.instagramUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className: 'flex gap-3',
                          children: [
                            _jsx(FaInstagram, { className: 'text-2xl' }),
                            _jsx('p', { children: proffesionalPersonData.instagramUrl }),
                          ],
                        }),
                      }),
                    proffesionalPersonData.twitterUrl &&
                      _jsx('div', {
                        className: 'flex gap-3',
                        children: _jsxs('a', {
                          href: proffesionalPersonData.twitterUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className: 'flex gap-3',
                          children: [
                            _jsx(FaTwitter, { className: 'text-2xl' }),
                            _jsx('p', { children: proffesionalPersonData.twitterUrl }),
                          ],
                        }),
                      }),
                    proffesionalPersonData.linkedinUrl &&
                      _jsx('div', {
                        className: 'flex gap-3',
                        children: _jsxs('a', {
                          href: proffesionalPersonData.linkedinUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className: 'flex gap-3',
                          children: [
                            _jsx(FaLinkedin, { className: 'text-2xl' }),
                            _jsx('p', { children: proffesionalPersonData.linkedinUrl }),
                          ],
                        }),
                      }),
                  ],
                })
              : null,
          ],
        }),
      }),
      _jsxs('div', {
        className: 'my-4',
        children: [
          _jsxs('div', {
            className: 'flex my-4',
            children: [
              _jsx('h2', { className: 'text-3xl font-semibold', children: 'Reviews' }),
              _jsxs('button', {
                className: 'border-b border-b-black ms-auto flex justify-center items-center gap-2',
                onClick: () => {},
                children: [_jsx(FontAwesomeIcon, { icon: faPencil }), ' write a review'],
              }),
            ],
          }),
          _jsx('div', {
            id: 'reviews',
            className: 'flex flex-col gap-4',
            children: proffesionalPersonData.reviews?.map((item, index) => _jsx(ReviewCard, { data: item }, index)),
          }),
        ],
      }),
    ],
  });
};
export default LookingToHireSomeoneDetailsScreen;
