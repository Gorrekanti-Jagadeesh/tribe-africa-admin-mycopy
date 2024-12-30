import { useParams } from 'react-router';
import AccomodationScreen from './accomodation-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { fromKebabCase, toKebabCase } from '@utils/common';

const AccomodationContainer = () => {
  const { country, category } = useParams();
  // Use React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['accomodationData', country],
    queryFn: () =>
      sanity.GET(`*[_type == "accommodation" && country == "${fromKebabCase(country)}"]{
      _id, name, phone_no, website, amount, images[0], reviews
    }`),
  });

  return <AccomodationScreen data={data} error={error} isLoading={isLoading} country={country} category={category} />;
};

export default AccomodationContainer;
