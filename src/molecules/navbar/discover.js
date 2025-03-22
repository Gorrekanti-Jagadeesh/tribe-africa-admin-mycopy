import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { sanity } from '@utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';
import OverLayCard from '@atoms/card/overlay-card';
const Discover = () => {
  const [toggle, setToggle] = useState(true);
  const [content, setContent] = useState({
    title: '',
    onClick: () => {},
    data: [],
  });
  const navigate = useNavigate();
  const handleToggle = (data) => {
    setToggle(false);
    setContent(data);
  };
  const {
    data: discoverData,
    error: discoverError,
    isLoading: discoverLoading,
  } = useQuery({
    queryKey: ['home-discover-section-data'],
    queryFn: () => sanity.GET(`*[_type == "home-discover-section"]`), // Handle undefined 'country'
  });
  if (discoverLoading) {
    return _jsx(Loading, {});
  }
  if (discoverError) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  return _jsxs('div', {
    className: 'p-2 md:p-3',
    children: [
      _jsx('h4', { className: 'text-left text-orange-500 text-lg font-semibold', children: '\u2192 Discover' }),
      _jsx('div', {
        className: `grid grid-cols-2 md:grid-cols-4 w-full ${toggle ? 'block' : 'hidden'}`,
        children: discoverData.map((each) =>
          _jsx(
            'div',
            {
              // className="cursor-pointer w-1/3 m-2"
              onClick: () => handleToggle({ data: each.subCategories, title: each.name }),
              className: 'm-4',
              children: _jsx(OverLayCard, {
                data: {
                  title: each.name,
                  image: sanityImageUrlBuilder(each.image).url(),
                },
              }),
            },
            each._id
          )
        ),
      }),
      _jsxs('div', {
        id: 'sub-layout',
        className: `p-2 md:p-8 border border-cyan-400 m-2 text-left bg-white text-black rounded-2xl ${toggle ? 'hidden' : 'block'}`,
        children: [
          _jsxs('h4', {
            className: 'text-orange-500 text-lg hover:underline cursor-pointer w-fit',
            onClick: () => setToggle(true),
            children: ['\u2190 ', content.title],
          }),
          _jsx('div', {
            className: 'grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto px-2',
            children: content.data.map((each) =>
              _jsx(
                'div',
                {
                  // className="cursor-pointer w-1/3 m-2"
                  onClick: () => navigate(`discover/${toKebabCase(content.title)}/${toKebabCase(each.name)}`),
                  className: 'm-4',
                  children: _jsx(OverLayCard, {
                    data: {
                      title: each.name,
                      image: sanityImageUrlBuilder(each.image).url(),
                    },
                  }),
                },
                each._id
              )
            ),
          }),
        ],
      }),
    ],
  });
};
export default Discover;
