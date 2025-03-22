import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import Button from '../../atoms/custom-button/button';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate, useParams } from 'react-router';
import { fromKebabCase, toKebabCase } from '@utils/common';
const Blogs = () => {
  const { country } = useParams();
  const navigation = useNavigate();
  const customCountry = country ? fromKebabCase(country) : 'Home';
  const {
    data: blogData,
    error: blogError,
    isLoading: blogLoading,
  } = useQuery({
    queryKey: ['blogs-categories-data'],
    queryFn: () => sanity.GET(`*[_type == "blog-categories" && country == "${customCountry}"][0]`),
  });
  if (blogLoading) {
    return 'loading';
  }
  if (blogError) {
    return 'Error';
  }
  return _jsxs('div', {
    className: 'p-2 md:p-3',
    children: [
      _jsxs('div', {
        className: 'flex items-center mb-4',
        children: [
          _jsx('h4', { className: 'text-left text-orange-500 text-lg font-semibold', children: '\u2192 Blogs' }),
          _jsx(Button, {
            className: 'bg-orange-500 text-white font-semibold px-4 py-2 rounded-md w-full md:w-fit md:ms-auto',
            children: 'Contribute',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'flex flex-col md:flex-row',
        children: [
          _jsx('div', {
            className: 'md:w-2/3 gap-4 flex flex-col',
            children: _jsx('div', {
              className: 'grid grid-cols-2 md:grid-cols-3 gap-4',
              children: blogData.articles.map((each, index) =>
                _jsxs(
                  'div',
                  {
                    className: 'w-full',
                    onClick: () => {
                      country
                        ? navigation(`/${country}/${toKebabCase(each.articleType)}/blogs`)
                        : navigation(`/${toKebabCase(each.articleType)}/blogs`);
                    },
                    children: [
                      _jsx('img', {
                        src: sanityImageUrlBuilder(each.categoryImage).url(),
                        alt: each.articleType,
                        className: 'w-full md:h-full rounded-md mb-2',
                      }),
                      _jsxs('div', { className: 'text-center text-white', children: [each.articleType, ' Articles'] }),
                    ],
                  },
                  index
                )
              ),
            }),
          }),
          _jsxs('div', {
            className: 'md:ml-6 flex flex-col flex-grow gap-4',
            children: [
              _jsx('div', {
                className: 'bg-gray-700 text-white rounded-md aspect-video flex',
                children: _jsx('p', { className: 'm-auto', children: 'Business Videos' }),
              }),
              _jsx('div', {
                className: 'bg-gray-700 text-white rounded-md aspect-video flex',
                children: _jsx('p', { className: 'm-auto', children: 'Holiday Videos' }),
              }),
              _jsx('div', {
                className: 'bg-gray-700 text-white rounded-md aspect-video flex',
                children: _jsxs('div', {
                  className: ' gap-2 m-auto',
                  children: [
                    _jsx('p', { children: 'Our Podcast' }),
                    _jsx('span', {
                      className: 'text-white m-4 text-2xl relative top-1',
                      children: _jsx(FontAwesomeIcon, { icon: faYoutube }),
                    }),
                    '|',
                    _jsx('span', {
                      className: 'text-white m-4 text-2xl relative top-1',
                      children: _jsx(FontAwesomeIcon, { icon: faSpotify }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default Blogs;
