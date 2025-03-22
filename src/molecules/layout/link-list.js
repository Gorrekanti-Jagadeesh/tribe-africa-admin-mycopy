import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
export const LinkList = ({ heading, links, className, subLinksHeading, subLinks, disable = false }) => {
  return _jsxs(_Fragment, {
    children: [
      _jsxs('div', {
        id: 'about',
        className: `${className} space-y-2`,
        children: [
          _jsx('div', { children: heading }),
          _jsx('ul', {
            className: 'space-y-2',
            children: links.map((link, index) =>
              _jsx(
                'li',
                {
                  className: 'text-sm md:text-base',
                  children: disable
                    ? _jsx('span', { className: 'text-gray-400 cursor-not-allowed', children: link.label })
                    : _jsx('a', { href: link.url, className: 'hover:underline', children: link.label }),
                },
                index
              )
            ),
          }),
        ],
      }),
      subLinks &&
        _jsxs('div', {
          className: `${className}`,
          children: [
            _jsx('div', { className: 'my-2', children: subLinksHeading }),
            _jsx('ul', {
              className: 'space-y-2',
              children: subLinks.map((link, index) =>
                _jsx(
                  'li',
                  { className: 'text-sm md:text-base', children: _jsx('a', { href: link.url, children: link.label }) },
                  index
                )
              ),
            }),
          ],
        }),
    ],
  });
};
