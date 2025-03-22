import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
const SocialLinks = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  const socialLinks = [
    { href: 'https://facebook.com', icon: faFacebookF },
    { href: 'https://twitter.com', icon: faTwitter },
    { href: 'https://instagram.com', icon: faInstagram },
    { href: 'https://linkedin.com', icon: faLinkedinIn },
  ];
  return _jsxs('div', {
    className: 'fixed top-1/2 right-0 flex z-10',
    children: [
      _jsx('button', {
        onClick: handleButtonClick,
        id: 'show-links',
        className:
          'h-fit p-2 px-1 rounded-l-sm bg-orange-500 text-white transition-colors duration-700 ease-in-out hover:bg-orange-400 flex items-center',
        children: isVisible
          ? _jsx(_Fragment, { children: _jsx(FontAwesomeIcon, { icon: faChevronRight }) })
          : _jsx(FontAwesomeIcon, { icon: faChevronLeft }),
      }),
      isVisible &&
        _jsx('div', {
          className: 'flex flex-col gap-1 bg-white py-2 px-1 border border-orange-400',
          children: socialLinks.map((link) =>
            _jsx(
              'a',
              {
                href: link.href,
                target: '_blank',
                rel: 'noopener noreferrer',
                className:
                  ' border rounded-full bg-black text-white px-1 text-center transition-colors duration-300 ease-in-out',
                children: _jsx(FontAwesomeIcon, { icon: link.icon }),
              },
              link.href
            )
          ),
        }),
    ],
  });
};
export default SocialLinks;
