import { useNavigate, useParams } from 'react-router';
import EventsScreen from './events-screen';
import demo from '@assets/homepage-welcome-image-3.png';
import { useEffect, useState } from 'react';
import { getDataByEntryType, sanityImageUrlBuilder } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase, toKebabCase } from '@utils/common';

const EventsPage = () => {
  const { event_type, event_category } = useParams();

  const customEventCategory = fromKebabCase(event_category);
  const customEventType = fromKebabCase(event_type);

  // Query for fallback data, always executed
  const {
    data: eventImage,
    isLoading: eventImageLoading,
    error: eventImageError,
  } = useQuery({
    queryKey: ['event-image', customEventCategory, customEventType],
    queryFn: () =>
      sanity.GET(`*[_type == "event-categories" && category == "${customEventCategory}"]{
        subCategories[title == "${customEventType}"]{
          subCategoryImage
        }
      }[0].subCategories[0].subCategoryImage`),
  });

  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: ['business-events', customEventCategory, customEventType],
    queryFn: () =>
      sanity.GET(`*[_type == "event" && category == "${customEventCategory}" && type == "${customEventType}"]`),
  });

  if (eventImageLoading || eventsLoading) {
    return 'Loading...';
  }

  if (eventImageError || eventsError) {
    return 'An error occurred...';
  }

  return (
    <EventsScreen heading={`${customEventType} events`} image={sanityImageUrlBuilder(eventImage)} data={eventsData} />
  );
};

export default EventsPage;
