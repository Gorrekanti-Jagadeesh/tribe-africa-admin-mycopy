import { FC } from 'react';
import AccommodationView from '../../../molecules/accomodations/accomodation-view';

import { Review, HotelData } from '../../../types';

interface AccomodationDetailsScreenProps {
  reviews: Review[];
  hotelData: HotelData;
}

const AccomodationDetailsScreen: FC<AccomodationDetailsScreenProps> = ({ reviews, hotelData }) => {
  return <AccommodationView reviews={reviews} hotelData={hotelData} />;
};

export default AccomodationDetailsScreen;
