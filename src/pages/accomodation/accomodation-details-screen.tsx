import { FC } from 'react';
import AccommodationView from '../../molecules/accomodations/accomodation-view';

import { ReviewProps, HotelData } from '../../types';
import { Control } from 'react-hook-form';

interface AccomodationDetailsScreenProps {
  reviews: ReviewProps[];
  hotelData: HotelData;
  onSubmit: () => void;
  control: Control;
  isSubmitting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AccomodationDetailsScreen: FC<AccomodationDetailsScreenProps> = ({
  reviews,
  hotelData,
  onSubmit,
  control,
  isSubmitting,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <AccommodationView
      reviews={reviews}
      hotelData={hotelData}
      onSubmit={onSubmit}
      control={control}
      isSubmitting={isSubmitting}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
};

export default AccomodationDetailsScreen;
