// screens/AccomodationScreen.tsx

import AccomodationView from '@molecules/accomodations/accomodation-view';
import AccomodationsList from '@molecules/accomodations/accomodations-list';

interface Review {
  user_name: string;
  user_image: string;
  date: string;
  description: string;
  images: string[];
  ratings: { title: string; rating: string }[];
}

interface HotelData {
  name: string;
  rating: string;
  images: string[];
  description: string;
  reviewCount: string;
  address: string;
  phone: string;
  website: string;
}

interface AccomodationScreenProps {
  accomodationId?: string;
  data: {
    name: string;
    image: string;
    rating: string;
    review_count: string;
    distance: string;
    price: string;
  }[];
  hotelData: HotelData;
  reviews: Review[];
}

const AccomodationScreen: React.FC<AccomodationScreenProps> = ({ accomodationId, data, hotelData, reviews }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      {!accomodationId ? <AccomodationsList data={data} /> : <AccomodationView data={hotelData} reviews={reviews} />}
    </div>
  );
};

export default AccomodationScreen;
