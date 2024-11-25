import { FC } from 'react';
import AccommodationView from '../../molecules/accomodations/accomodation-view';

import { Review, HotelData } from '../../types';
import { Control } from 'react-hook-form';

interface AccomodationDetailsScreenProps {
  reviews: Review[];
  hotelData: HotelData;
  onSubmit: () => void;
  control: Control;
}

const AccomodationDetailsScreen: FC<AccomodationDetailsScreenProps> = ({ reviews, hotelData, onSubmit, control }) => {
  return <AccommodationView reviews={reviews} hotelData={hotelData} onSubmit={onSubmit} control={control} />;
};

export default AccomodationDetailsScreen;
