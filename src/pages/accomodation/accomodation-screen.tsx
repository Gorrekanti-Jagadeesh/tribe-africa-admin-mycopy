import { Loading } from '@atoms/common/loading';
import Button from '@atoms/custom-button/button';
import AccommodationCard from '@atoms/card/accomodation-card';

import { accommodationCardProps } from '../../types/index';

interface AccomodationScreenProps {
  data: accommodationCardProps[];
  error: Error;
  isLoading: boolean;
}

const AccomodationScreen: React.FC<AccomodationScreenProps> = ({ data, error, isLoading }) => {
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Data not loaded yet..</div>;

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold">Accommodations</h1>
          <Button className="ms-auto">List your accommodation</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
          {data.map((item) => (
            <AccommodationCard key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccomodationScreen;
