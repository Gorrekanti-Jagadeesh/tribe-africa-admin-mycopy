import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FloatingSibling } from '@molecules/common/floating-sibling';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase, toKebabCase } from '@utils/common';
import { LinkList } from '@molecules/layout/link-list';
import { networkURLs } from '@data/index';
import { Loading } from '@atoms/common/loading';
import { useNavigate } from 'react-router';
const TribeAfricaPagesNavcategoryItem = ({ category, country }) => {
  const navigation = useNavigate();
  return _jsxs('div', {
    className: 'flex justify-between md:flex-col md:justify-start',
    children: [
      _jsx('div', {
        className: 'border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full',
        children: _jsx('img', {
          src: sanityImageUrlBuilder(category.image).url(),
          alt: category.title,
          className: 'w-full h-48 aspect-square object-cover',
        }),
      }),
      _jsxs('div', {
        className: 'text-left order-1 md:order-2 w-1/2 md:w-full',
        children: [
          _jsx('h3', { className: 'text-lg md:text-xl font-semibold', children: category.title }),
          _jsx('ul', {
            children: category.items.map((eachCategory, index) => {
              return _jsx(
                'li',
                {
                  className: 'text-sm md:text-base cursor-pointer hover:underline my-2',
                  children: _jsx(FloatingSibling, {
                    component: _jsx('span', { children: eachCategory?.label }),
                    sibling: _jsxs('div', {
                      className:
                        'min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black',
                      children: [
                        _jsxs('h4', {
                          className: 'text-orange-500 font-semibold',
                          children: ['\u2192 ', eachCategory.label],
                        }),
                        eachCategory?.hasSubcategories &&
                          eachCategory?.subCategories?.map((item, index) => {
                            return _jsx(
                              'li',
                              {
                                onClick: () => {
                                  console.log(
                                    '------',
                                    `/${toKebabCase(country)}/business/${toKebabCase(eachCategory.label)}/${item.title}`
                                  );
                                  if (toKebabCase(eachCategory.label) === 'accommodation') {
                                    return navigation(
                                      `/${toKebabCase(country)}/business/${toKebabCase(eachCategory.label)}/${item.title}`
                                    );
                                    // return navigation(`/${country}/business/details/${toKebabCase(item.title)}`);
                                  }
                                  return navigation(
                                    `/${toKebabCase(country)}/business/tribe-africa-pages/${toKebabCase(eachCategory.label)}/${toKebabCase(item.title)}`
                                  );
                                },
                                children: fromKebabCase(item.title),
                              },
                              index
                            );
                          }),
                      ],
                    }),
                    hasSubcategories: eachCategory.hasSubcategories,
                    mainCategory: eachCategory.label,
                    country: toKebabCase(country),
                    pageType: 'business',
                  }),
                },
                index
              );
            }),
          }),
        ],
      }),
    ],
  });
};
const EventsNavcategoryItem = ({ category }) =>
  _jsxs('div', {
    className: 'flex justify-between md:flex-col md:justify-start',
    children: [
      _jsx('div', {
        className: 'border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full',
        children: _jsx('img', {
          src: category.imageUrl,
          alt: category.title,
          className: 'w-full h-48 aspect-square object-cover',
        }),
      }),
      _jsx(LinkList, {
        heading: _jsx('h3', { className: 'text-lg md:text-xl font-semibold', children: category.title }),
        links: category.items,
        className: 'text-left order-1 md:order-2 w-1/2 md:w-full',
        disable: false,
      }),
    ],
  });
const MyTribeNavcategoryItem = ({ category }) =>
  _jsxs('div', {
    className: 'flex justify-between md:flex-col md:justify-start',
    children: [
      _jsx('div', {
        className: 'border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full',
        children: _jsx('img', {
          src: category.image,
          alt: category.title,
          className: 'w-full h-48 aspect-square object-cover',
        }),
      }),
      _jsx(LinkList, {
        heading: _jsx('h3', { className: 'text-lg md:text-xl font-semibold', children: category.title }),
        links: category.items,
        className: 'text-left order-1 md:order-2 w-1/2 md:w-full',
        disable: true,
      }),
    ],
  });
const Network = ({ country }) => {
  const [eventCategories, setEventCategories] = useState([]);
  const {
    data: networkData,
    isLoading: networkDataLoading,
    error: networkDataError,
  } = useQuery({
    queryKey: ['network'],
    queryFn: () => sanity.GET(`*[_type == "tribe-africa-pages"]`),
  });
  const {
    data: eventsData,
    error: eventsDataError,
    isLoading: eventsDataLoading,
  } = useQuery({
    queryKey: ['country-network-events'],
    queryFn: () =>
      sanity.GET(`*[_type == "event-categories" && category == "Business"]{
        category,
        "imageUrl": categoryImage.asset->url,
        subCategories[] {
          title,
          "subCategoryImage": subCategoryImage.asset->url
        }
      }`),
  });
  useEffect(() => {
    if (eventsData) {
      // Transform data to match eventCategories format
      const formattedData = eventsData.map((category) => ({
        title: category.category, // Category Title
        imageUrl: category.imageUrl, // Category Image URL
        items: category.subCategories.map((subCategory) => ({
          label: subCategory.title,
          url: `/${toKebabCase(country)}/events/${toKebabCase(category.category)}/${toKebabCase(subCategory.title)}`,
          imageUrl: subCategory.subCategoryImage,
        })),
      }));
      setEventCategories(formattedData);
    }
  }, [eventsData, country]);
  if (eventsDataLoading || networkDataLoading) return _jsx(Loading, {});
  if (eventsDataError || networkDataError) return _jsx('div', { children: 'Error Loading Data' });
  // console.log('-----networkData', networkData)
  return _jsx('div', {
    children: _jsxs('section', {
      className: 'flex flex-col p-2 md:p-3 max-w-6xl m-auto',
      children: [
        _jsx('h4', { className: ' text-left text-orange-500 text-lg mb-4 font-semibold', children: '\u2192 Network' }),
        _jsxs('div', {
          className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
          children: [
            networkData?.map((category, index) =>
              _jsx(TribeAfricaPagesNavcategoryItem, { category: category, country: country }, index)
            ),
            eventCategories.map((category, index) => _jsx(EventsNavcategoryItem, { category: category }, index)),
            _jsx(MyTribeNavcategoryItem, { category: networkURLs }),
          ],
        }),
      ],
    }),
  });
};
export default Network;
