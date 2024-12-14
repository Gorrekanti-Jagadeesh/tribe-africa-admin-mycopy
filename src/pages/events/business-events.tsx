import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { useLocation, useParams } from 'react-router';
import EventsScreen from './events-screen';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase } from '@utils/common';

const BusinessEventsPage = () => {
  const location = useLocation();
  const params = useParams();

  // Extract fallback country and event_type from params
  const fallbackCountry = fromKebabCase(params.country || '');
  const fallbackEventType = fromKebabCase(params.event_type || '');

  // Query for fallback data, always executed
  const {
    data: fallbackData,
    isLoading: fallbackLoading,
    error: fallbackError,
  } = useQuery({
    queryKey: ['fallback-events'],
    queryFn: () =>
      sanity.GET(`*[_type == "event-sub-categories" && category == "business" && title == "${fallbackEventType}"][0]`),
  });

  console.log(fallbackData, 'ppp', fallbackEventType);
  // Extract data from location.state or fallback
  const image = location.state?.image || (fallbackData ? fallbackData?.image : '');
  const country = location.state?.country || fallbackCountry;
  const event_type = location.state?.event_type || fallbackEventType;

  // Query for events data, always executed
  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: ['business-events', country, event_type],
    queryFn: () =>
      sanity.GET(
        `*[_type == "event" && lower(country) == "${country}" && category == "business" && type == "${event_type}"]`
      ),
    enabled: !!country && !!event_type, // Only run this query if country and event_type are available
  });

  if (fallbackLoading || eventsLoading) {
    return 'Loading...';
  }

  if (fallbackError || eventsError) {
    return 'An error occurred...';
  }

  return (
    <div>
      <EventsScreen
        heading={`${country} ${event_type} events`}
        image={sanityImageUrlBuilder(image)}
        data={eventsData}
      />
    </div>
  );
};

export default BusinessEventsPage;
