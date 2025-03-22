import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useNavigate, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';
const Card = ({ imageUrl, title, subtitle, description, link }) => {
  return _jsxs('div', {
    className: 'flex flex-col md:flex-row items-center mb-12',
    children: [
      _jsx('div', {
        className: 'md:w-1/3 p-4 mb-auto',
        children: _jsx('img', { src: imageUrl, alt: title, className: 'rounded-lg shadow-lg aspect-square' }),
      }),
      _jsxs('div', {
        className: 'md:w-full p-4',
        children: [
          _jsx('h2', { className: 'text-3xl font-bold', children: title }),
          _jsx('h3', { className: 'italic text-gray-600 mb-4', children: subtitle }),
          _jsx('p', { className: 'text-lg mb-4', children: description }),
          link && _jsx('a', { href: link, className: 'text-blue-500 hover:underline', children: link }),
        ],
      }),
    ],
  });
};
const DiscoverArticles = () => {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const {
    data: articlesData,
    error: articlesError,
    isLoading: articlesLoading,
  } = useQuery({
    queryKey: ['discover-articles', category, subcategory],
    queryFn: () =>
      sanity.GET(`
        *[_type == "home-discover-section" && name == "${fromKebabCase(category)}"]{
          subCategories[ name == "${fromKebabCase(subcategory)}" ]
          {
            discoverArticles[]->{
              title,
              subtitle,
              description,
              "imageUrl": image.asset->url
            }
          }
        }[0].subCategories[0].discoverArticles
      `),
  });
  if (articlesLoading) {
    return _jsx(Loading, {});
  }
  if (articlesError) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  return _jsx('div', {
    className: 'bg-gray-50 p-4',
    children: _jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        _jsx('header', {
          className: 'p-4 mb-8',
          children: _jsxs('h1', {
            className: 'text-4xl md:text-5xl flex',
            children: [
              _jsxs('p', {
                children: [
                  _jsx('span', {
                    className: 'text-orange-500 font-serif',
                    children: fromKebabCase(subcategory).split(' ')[0],
                  }),
                  ' ',
                  fromKebabCase(subcategory).split(' ').slice(1).join(' '),
                ],
              }),
              _jsx('button', {
                className: 'ms-auto p-2 py-0',
                onClick: () => navigate('/'),
                children: _jsx(FontAwesomeIcon, { className: ' max-w-6', icon: faArrowLeft }),
              }),
            ],
          }),
        }),
        articlesData.map((article, index) =>
          _jsx(
            Card,
            {
              imageUrl: article.imageUrl,
              title: article.title,
              subtitle: article.subtitle,
              description: article.description,
              link: article.link,
            },
            index
          )
        ),
      ],
    }),
  });
};
export default DiscoverArticles;
