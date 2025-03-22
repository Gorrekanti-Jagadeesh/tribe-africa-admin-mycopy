import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import DualHeading from '@atoms/heading/dual-heading';
import UnderlineHeading from '@atoms/heading/underline-heading';
import { flags } from '@data/index';
import { fromKebabCase, toKebabCase } from '@utils/common';
import { useNavigate } from 'react-router';
const CountryDetailsScreen = ({ country, content, fieldTitles }) => {
  const navigate = useNavigate();
  if (!flags[toKebabCase(country)]) navigate('/not-found');
  return _jsxs('div', {
    className: 'flex flex-col gap-4 h-screen overflow p-2 md:p-4',
    children: [
      _jsx(DualHeading, { children: '*' + fromKebabCase(country) + '*' }),
      content &&
        _jsxs('div', {
          className: 'flex flex-col md:flex-row gap-4 flex-grow overflow-scroll',
          children: [
            _jsx('div', {
              className: 'bg-[#565555] text-white overflow-scroll min-h-[30%] md:w-1/3 rounded-lg p-2',
              children: Object.keys(content).map((key) =>
                _jsx('a', { href: `#${key}`, children: _jsx('p', { children: fieldTitles[key] }) }, key)
              ),
            }),
            _jsx('div', {
              className: 'overflow-y-auto md:flex-1 md:w-2/3',
              children: Object.keys(content).map((key) =>
                _jsxs(
                  'div',
                  {
                    id: key,
                    children: [
                      _jsx(UnderlineHeading, { className: 'text-lg font-semibold', children: fieldTitles[key] }),
                      _jsx('p', { children: content[key] }),
                    ],
                  },
                  key
                )
              ),
            }),
          ],
        }),
    ],
  });
};
export default CountryDetailsScreen;
