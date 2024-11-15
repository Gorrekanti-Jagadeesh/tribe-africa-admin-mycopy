import { useQuery } from '@tanstack/react-query';
import { getDataByDocumentTypeWithId } from '../../../api';
import { useParams, useLocation } from 'react-router-dom';
import AccomodationDetailsScreen from './accomodation-details-screen';

const AccommodationDetailsContainer = () => {
  const { accommodationId } = useParams<{ accommodationId: string }>();
  const location = useLocation();
  const { data } = location.state || {}; // Add fallback empty object

  const fetchReviewsByHotelId = async (hotelId: string) => {
    const reviews = await getDataByDocumentTypeWithId('review', 'hotel_id', hotelId, [
      'review_text',
      'quality_of_service',
      'comfort',
      'food_and_beverage',
      'location',
      'cleanliness',
      'total_rating',
      'created_at',
      'images',
      'reviewer_name',
      'reviewer_image',
    ]);
    return reviews;
  };

  const {
    data: reviews,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['reviews', accommodationId || 'defaultId'],
    queryFn: () => (accommodationId ? fetchReviewsByHotelId(accommodationId) : Promise.resolve([])),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching reviews: {error.message}</div>;

  return (
    <div>
      <AccomodationDetailsScreen reviews={reviews} hotelData={data} />
    </div>
  );
};

export default AccommodationDetailsContainer;
