import React, { useEffect, useState } from 'react';
import { EventCategory } from '@types/index';
import NavLayout from '@molecules/layout/nav-layout';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { toKebabCase } from '@utils/common';

const Events: React.FC = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

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

      setEventCategories(formattedData as EventCategory[]);
    }
  }, [eventsData]);

  if (eventsLoading) return <div>Loading...</div>;
  if (eventsError) return <div>Error loading events</div>;

  return (
    <>
      <NavLayout eventCategories={eventCategories || []} showButton={true} showModal={true} navLayoutHeading="Events" />
    </>
  );
};

export default Events;
