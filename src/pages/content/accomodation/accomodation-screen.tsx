import AccomodationView from '../../../molecules/accomodations/accomodation-view';

import AccommodationCard from '../../../atoms/card/accomodation-card';
import Button from '../../../atoms/custom-button/button';
import AccomodationsList from '../../../molecules/accomodations/accomodations-list';

interface AccomodationProps {
  data: {
    name: string;
    image: string;
    rating: string;
    reviewCount: string;
    distance: string;
    price: string;
  }[];
}

const AccomodationScreen: React.FC<AccomodationProps> = ({ data }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      {/* <AccomodationsList data = {data}/> */}
      <AccomodationView />
    </div>
  );
};

export default AccomodationScreen;
