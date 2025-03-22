import { jsx as _jsx, Fragment as _Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import NavLayout from '@molecules/layout/nav-layout';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { toKebabCase } from '@utils/common';
const Events = () => {
  const [eventCategories, setEventCategories] = useState([]);
  // Fetch data from Sanity
  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: ['events'],
    queryFn: () =>
      sanity.GET(`*[_type == "event-categories"]{
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
          url: `/events/${toKebabCase(category.category)}/${toKebabCase(subCategory.title)}`,
          imageUrl: subCategory.subCategoryImage,
        })),
      }));
      setEventCategories(formattedData);
    }
  }, [eventsData]);
  if (eventsLoading) return _jsx('div', { children: 'Loading...' });
  if (eventsError) return _jsx('div', { children: 'Error loading events' });
  return _jsx(_Fragment, {
    children: _jsx(NavLayout, { eventCategories: eventCategories || [], showButton: true, navLayoutHeading: 'Events' }),
  });
};
export default Events;
