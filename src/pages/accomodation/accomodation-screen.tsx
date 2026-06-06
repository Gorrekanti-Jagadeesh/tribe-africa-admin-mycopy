import { Loading } from '@atoms/common/loading';
import Button from '@atoms/custom-button/button';
import AccommodationCard from '@atoms/card/accomodation-card';
import { accommodationCardProps } from '@/types/index';
import { fromKebabCase } from '@utils/common';
import { useNavigate } from 'react-router-dom';

interface AccomodationScreenProps {
  data: accommodationCardProps[];
  error: Error;
  isLoading: boolean;
  country: string;
  category: string;
  subCategory: string;
}

const AccomodationScreen: React.FC<AccomodationScreenProps> = ({
  data,
  error,
  isLoading,
  country,
  category,
  subCategory,
}) => {
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (error) return <div className="p-8 font-poppins text-xl">Error loading data</div>;
  if (!data) return <div className="p-8 font-poppins text-xl">Data not loaded yet..</div>;

  return (
    <div className="px-4 py-6 max-w-8xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black">
          {fromKebabCase(subCategory)}
        </h1>
        <Button className="shrink-0 text-lg md:text-2xl px-8 md:px-10 py-3 md:py-4" onClick={() => navigate('/form')}>
          List your accommodation
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((item) => (
          <AccommodationCard
            key={item._id}
            data={item}
            country={country}
            category={category}
            subCategory={subCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default AccomodationScreen;
