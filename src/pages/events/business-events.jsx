import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { useLocation } from 'react-router';
import EventsScreen from './events-screen';
import { sanityImageUrlBuilder } from '@api/index';

const BusinessEventsPage = () => {
  const location = useLocation();
  const { image, country, event_type } = location.state;
  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: ['business-events', country],
    queryFn: () =>
      sanity.GET(
        `*[_type == "event" && lower(country) == "${country}" && category == "business" && type == "${event_type}"]`
      ),
  });

  if (eventsLoading) {
    return 'Loading';
  }
  if (eventsError) {
    return 'Error occured...';
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
