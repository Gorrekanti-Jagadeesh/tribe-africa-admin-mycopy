import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { default as SubscribeEmail } from '../../atoms/common/input-action';
import { LinkList } from '@molecules/layout/link-list';
import { TribeAfrica } from '../../atoms/common/internal-logo';
import spiralBackground from '@assets/branding-bg-dark.png';
import SocialLinks from '@atoms/socia-icons/social-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const footerLinks = {
  about: [
    {
      label: 'About us',
      url: '',
    },
    {
      label: 'Resources & Policies',
      url: '',
    },
    {
      label: 'Trust & Safety',
      url: '',
    },
  ],
  business: [
    {
      label: 'Invest with us',
      url: '',
    },
    {
      label: 'Advertise with us',
      url: '',
    },
  ],
  join: [
    {
      label: 'Add your business',
      url: '',
    },
    {
      label: 'Add your service',
      url: '',
    },
    {
      label: 'Add a place',
      url: '',
    },
    {
      label: 'Add your event',
      url: '',
    },
    {
      label: 'Work with the Tribe',
      url: '',
    },
    {
      label: 'Contribute to our blog',
      url: '',
    },
  ],
  apps: [
    {
      label: 'Android App',
      url: '',
    },
    {
      label: 'iPhone App',
      url: '',
    },
  ],
};
const Footer = () => {
  return _jsx('footer', {
    className: 'bg-black text-white px-4 py-8 md:text-left',
    style: { backgroundImage: `url(${spiralBackground})` },
    children: _jsxs('div', {
      className: 'container mx-auto p-2 md:p-4 text-slate-300 m-auto max-w-6xl',
      children: [
        _jsxs('div', {
          className: 'grid grid-cols-1 md:grid-cols-3 md:gap-8',
          children: [
            _jsxs('div', {
              className: 'col-span-1 grid gap-2',
              children: [
                _jsx(LinkList, {
                  heading: _jsxs('div', {
                    className: 'text-xl text-orange-500 font-semibold',
                    children: ['About ', _jsx(TribeAfrica, {})],
                  }),
                  links: footerLinks.about,
                }),
                _jsx(LinkList, {
                  heading: _jsxs('div', {
                    className: 'text-xl text-orange-500 font-semibold',
                    children: ['Biz with ', _jsx(TribeAfrica, {})],
                  }),
                  links: footerLinks.business,
                }),
              ],
            }),
            _jsxs('div', {
              className: 'col-span-2 mt-4 md:mt-0',
              children: [
                _jsxs('div', {
                  className: 'grid md:flex gap-3 w-full',
                  children: [
                    _jsx(LinkList, {
                      heading: _jsxs('div', {
                        className: 'text-xl text-orange-500 font-semibold',
                        children: ['Join ', _jsx(TribeAfrica, {})],
                      }),
                      links: footerLinks.join,
                    }),
                    _jsx('div', {
                      className: 'col-span-1 md:ms-auto md:w-48',
                      children: _jsx(LinkList, {
                        heading: _jsx('div', {
                          className: 'text-xl text-orange-500 font-semibold',
                          children: 'Get the App',
                        }),
                        links: footerLinks.apps,
                      }),
                    }),
                  ],
                }),
                _jsxs('div', {
                  children: [
                    _jsx('h3', {
                      className: 'text-xl text-orange-500 font-bold mb-4 mt-4',
                      children: 'Subscribe to our newsletter',
                    }),
                    _jsx(SubscribeEmail, {
                      handleSubmit: () => console.log('submitted'),
                      inputType: 'email',
                      inputPlaceholder: 'Enter your email',
                      buttonPlaceholder: 'Subscribe',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        _jsx(SocialLinks, {}),
      ],
    }),
  });
};
export default Footer;
