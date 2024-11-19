import AccomodationsList from '../../molecules/accomodations/accomodations-list';

interface hotelData {
  _id: string;
  name: string;
  phone_number: string;
  website_url: string;
  location: string;
  rate: string;
  images: string[];
  description: string;
  created_at: string;
}

interface AccomodationScreenProps {
  hotelData: hotelData[];
}

const AccomodationScreen: React.FC<AccomodationScreenProps> = ({ hotelData }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <AccomodationsList hotelData={hotelData} />

      {/* <AccomodationView data={hotelData} reviews={reviews} /> */}
    </div>
  );
};

export default AccomodationScreen;
