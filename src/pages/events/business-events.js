import { jsx as _jsx } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { useParams } from 'react-router';
import EventsScreen from './events-screen';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase } from '@utils/common';
const CountryEventsPage = () => {
  const { country, event_type, event_category } = useParams();
  const customCountry = fromKebabCase(country);
  const customCategory = fromKebabCase(event_category);
  const customEventType = fromKebabCase(event_type);
  // Query for fallback data, always executed
  const {
    data: eventImage,
    isLoading: eventImageLoading,
    error: eventImageError,
  } = useQuery({
    queryKey: ['event-image', customEventType],
    queryFn: () =>
      sanity.GET(`*[_type == "event-categories" && category == "${customCategory}"]{
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
    queryKey: ['business-events', customCountry, customEventType],
    queryFn: () =>
      sanity.GET(
        `*[_type == "event" && country == "${customCountry}" && category == "${customCategory}" && type == "${customEventType}"]`
      ),
    enabled: !!country && !!event_type, // Only run this query if country and event_type are available
  });
  if (eventImageLoading || eventsLoading) {
    return 'Loading...';
  }
  if (eventImageError || eventsError) {
    return 'An error occurred...';
  }
  return _jsx('div', {
    children: _jsx(EventsScreen, {
      heading: `${customCountry} - ${customEventType} events`,
      image: sanityImageUrlBuilder(eventImage).url(),
      data: eventsData,
    }),
  });
};
export default CountryEventsPage;
