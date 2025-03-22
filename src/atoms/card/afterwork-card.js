import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';
const AfterWorkCard = ({ data, country, category, subCategory }) => {
  const { images, name, _id } = data;
  const { pageType } = useParams();
  const navigate = useNavigate();
  return _jsxs('div', {
    className: 'border rounded-lg shadow-sm overflow-hidden',
    children: [
      _jsx('img', {
        src: sanityImageUrlBuilder(images).url(),
        alt: name,
        className: 'w-full aspect-video rounded-lg h-48 object-cover',
      }),
      _jsxs('div', {
        className: 'p-4',
        children: [
          _jsx('h3', { className: 'text-lg font-semibold', children: name }),
          _jsx('div', { className: 'flex items-center text-orange-500 mt-1' }),
          _jsxs('div', {
            className: 'flex items-center text-gray-500 text-sm mt-2',
            children: [_jsx(FontAwesomeIcon, { icon: faMap }), _jsx('span', { className: 'ml-2', children: '5 km' })],
          }),
          _jsx('hr', { className: 'my-2' }),
          _jsxs('div', {
            className: 'flex',
            children: [
              _jsxs('div', {
                className: 'flex items-center',
                children: [
                  _jsx('span', { className: 'text-sm text-gray-500', children: 'From' }),
                  _jsx('span', { className: 'font-bold text-lg mx-2', children: data.amount }),
                ],
              }),
              _jsx('button', {
                className: 'w-fit ms-auto bg-orange-500 hover:bg-gray-700 text-white font-semibold  p-2 rounded-md',
                onClick: () => {
                  navigate(
                    `/${toKebabCase(country)}/${pageType}/${toKebabCase(category)}/afterwork/${toKebabCase(subCategory)}/${_id}`,
                    { state: { data } }
                  );
                },
                children: 'View',
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default AfterWorkCard;
