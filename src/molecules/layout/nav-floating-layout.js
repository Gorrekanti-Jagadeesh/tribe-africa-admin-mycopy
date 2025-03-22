import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime';
import OverLayCard from '../../atoms/card/overlay-card';
import { FloatingSibling } from '../common/floating-sibling';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate } from 'react-router';
import { toKebabCase } from '@utils/common';
const NavFloatingLayout = ({ categories, heading, country, pageType }) => {
  console.log('------------', categories, heading, country, pageType);
  const navigation = useNavigate();
  return _jsxs('div', {
    className: 'p-2 md:p-3',
    children: [
      _jsxs('h4', {
        className: 'text-left text-orange-500 max-w-6xl text-lg font-semibold',
        children: ['\u2192 ', heading],
      }),
      _jsx('div', {
        className: 'grid grid-cols-2 md:grid-cols-4 w-full',
        children: categories.map((each, index) =>
          _jsx(
            FloatingSibling,
            {
              component: _jsx('div', {
                className: 'm-4',
                children: _jsx(OverLayCard, {
                  data: {
                    title: each.category,
                    image: sanityImageUrlBuilder(each.icon).url(),
                  },
                }),
              }),
              sibling: _jsxs('div', {
                className:
                  'min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black',
                children: [
                  _jsxs('h4', { className: 'text-orange-500 font-semibold', children: ['\u2192 ', each.category] }),
                  each.subcategories &&
                    each.subcategories.map((item, index) =>
                      _jsxs(
                        'p',
                        {
                          onClick: () => {
                            const subcategory = typeof item === 'object' ? item?.value : toKebabCase(item);
                            console.log(
                              'After work route',
                              `/${country}/${pageType}/${toKebabCase(each.category)}/afterwork/${subcategory}`
                            );
                            // Handle both object and string cases
                            if (heading === 'After Work') {
                              if (each?.formType == 1) {
                                navigation(
                                  `/${country}/${pageType}/${toKebabCase(each.category)}/afterwork/${subcategory}`
                                );
                              } else {
                                navigation(
                                  `/${country}/${pageType}/find-a-business/${toKebabCase(each.category)}/${subcategory}`
                                );
                              }
                            } else {
                              navigation(`/${country}/${pageType}/${toKebabCase(each.category)}/${subcategory}`);
                            }
                          },
                          children: [typeof item === 'object' ? item?.title : item, ' '],
                        },
                        index
                      )
                    ),
                ],
              }),
              hasSubcategories: each.hasSubcategories,
              mainCategory: each.category,
              country: country,
              pageType: pageType,
              heading: heading,
              formType: each?.formType,
            },
            index
          )
        ),
      }),
    ],
  });
};
export default NavFloatingLayout;
