import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { useEffect } from 'react';
import { toKebabCase } from '@utils/common';
import { useNavigate } from 'react-router';
import { FloatingSibling } from '@molecules/common/floating-sibling';
const TravelKnowledge = ({ country, pageType }) => {
  const [travelCategories, setTravelCategories] = useState([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: [] });
  const navigation = useNavigate();
  const {
    data: travelData,
    error: travelError,
    isLoading: travelLoading,
  } = useQuery({
    queryKey: ['travel-knowledge', country],
    queryFn: () =>
      sanity.GET(`*[_type == "travel-knowldge" && country == "${country}"][0]{
        categories[] {
          category,
          "imageUrl": categoryImage.asset->url,
          subCategories[] {
            title,
            content, 
            accommodationCategories
          }
        }
      }`),
    enabled: Boolean(country),
  });
  useEffect(() => {
    if (travelData) {
      const formattedData = travelData.categories.map((category) => ({
        title: category.category,
        imageUrl: category.imageUrl,
        items: category.subCategories.map((subCategory) => ({
          label: subCategory.title,
          content: subCategory.content,
          accommodationCategories: subCategory.accommodationCategories,
        })),
      }));
      setTravelCategories(formattedData || []);
    }
  }, [travelData]);
  if (travelLoading) return _jsx('div', { children: 'Loading Travel Knowledge...' });
  if (travelError) return _jsx('div', { children: 'Error loading Travel Knowledge data.' });
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsContentOpen(true);
  };
  return _jsxs('section', {
    className: 'flex flex-col p-2 md:p-3 max-w-6xl m-auto',
    children: [
      _jsxs('div', {
        className: 'text-lg flex flex-col items-center md:flex-row mb-4',
        children: [
          _jsx('h4', {
            className: ' text-left text-orange-500 text-lg font-semibold',
            children: '\u2192 Travel Knowledge',
          }),
          _jsx(Modal, {
            isOpen: isOpen,
            setIsOpen: setIsOpen,
            containerClasses: 'ms-auto',
            children: _jsx(EventForm, {}),
          }),
          _jsx(Button, { onClick: () => setIsOpen(true), children: 'Advertise on tribe africa' }),
        ],
      }),
      _jsx('div', {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
        children: travelCategories.map((category, index) =>
          _jsxs(
            'div',
            {
              className: 'flex flex-col',
              children: [
                category.imageUrl &&
                  _jsx('div', {
                    className: 'border-2 border-orange-400 rounded-lg overflow-hidden mb-4 w-full',
                    children: _jsx('img', {
                      src: category.imageUrl,
                      alt: category.title,
                      className: 'w-full h-48 aspect-square object-cover',
                    }),
                  }),
                _jsxs('div', {
                  id: 'about',
                  className: 'text-left w-full space-y-2',
                  children: [
                    _jsx('h3', { className: 'text-lg md:text-xl font-semibold', children: category.title }),
                    _jsx('ul', {
                      className: 'space-y-2',
                      children: category.items.map((subCategory, idx) => {
                        if (subCategory.label == 'Accommodation') {
                          return _jsx(
                            'li',
                            {
                              className: 'text-sm md:text-base cursor-pointer hover:underline',
                              children: _jsx(FloatingSibling, {
                                component: _jsx('span', { children: subCategory.label }),
                                sibling: _jsxs('div', {
                                  className:
                                    'min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black',
                                  children: [
                                    _jsxs('h4', {
                                      className: 'text-orange-500 font-semibold',
                                      children: ['\u2192 ', subCategory.label],
                                    }),
                                    subCategory.accommodationCategories &&
                                      subCategory.accommodationCategories.map((item, index) =>
                                        _jsx(
                                          'li',
                                          {
                                            onClick: () =>
                                              navigation(
                                                `/${toKebabCase(country)}/${pageType}/${toKebabCase(subCategory.label)}/${toKebabCase(item)}`
                                              ),
                                            children: item,
                                          },
                                          index
                                        )
                                      ),
                                  ],
                                }),
                                hasSubcategories: true,
                                country: country,
                                pageType: pageType,
                              }),
                            },
                            index
                          );
                        }
                        return _jsx(
                          'li',
                          {
                            className: 'text-sm md:text-base cursor-pointer hover:underline',
                            onClick: () => {
                              if (subCategory.label == 'Q & A Forum') {
                                navigation(`/${toKebabCase(country)}/qna`);
                                return;
                              }
                              openModal(subCategory.label, subCategory.content);
                            },
                            children: subCategory.label,
                          },
                          idx
                        );
                      }),
                    }),
                  ],
                }),
              ],
            },
            index
          )
        ),
      }),
      _jsx(Modal, {
        isOpen: isContentOpen,
        setIsOpen: setIsContentOpen,
        containerClasses: 'ms-auto',
        customClasses: 'w-full h-screen',
        children: _jsxs('div', {
          id: 'sub-layout',
          className: 'p-2 md:p-8 border border-cyan-400 m-2 text-left bg-white text-black rounded-2xl',
          children: [
            _jsxs('h4', {
              className: 'text-orange-500 text-lg hover:underline cursor-pointer w-fit font-semibold',
              onClick: () => setIsContentOpen(false),
              children: ['\u2190 ', modalContent.title],
            }),
            _jsx('div', {
              className: 'space-y-4',
              children: modalContent.content.map((block, index) => {
                if (block._type === 'block') {
                  return _jsx('p', { className: 'text-base', children: block.children?.[0]?.text }, index);
                }
                if (block._type === 'image') {
                  return _jsx('img', { src: block.asset?.url, alt: block.alt || 'Image', className: 'w-full' }, index);
                }
                return null;
              }),
            }),
          ],
        }),
      }),
    ],
  });
};
export default TravelKnowledge;
