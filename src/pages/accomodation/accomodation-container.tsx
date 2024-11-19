// containers/AccomodationContainer.tsx

import { useParams } from 'react-router';
import AccomodationScreen from './accomodation-screen';
import { useQuery } from '@tanstack/react-query';
import { sanityImageUrlBuilder } from '../../api';
import { getDataByDocumentType } from '../../api';

// Function to fetch data from Sanity CMS
const fetchAccomodationData = async () => {
  const data = await getDataByDocumentType('hotel_v2', [
    '_id,  name',
    'phone_number',
    'website_url',
    'location',
    'rate',
    'images',
    'description',
  ]);

  // Ensure data is an array and map over each item to convert images to URLs
  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (item.images) {
        item.images = item.images.map((image: { asset: { _ref: string } }) =>
          sanityImageUrlBuilder(image.asset._ref).url()
        );
      }
    });
  }

  return data;
};

const AccomodationContainer = () => {
  const { accomodationId } = useParams();
  // Use React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['accomodationData', accomodationId],
    queryFn: fetchAccomodationData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <AccomodationScreen hotelData={data} />;
};

export default AccomodationContainer;
