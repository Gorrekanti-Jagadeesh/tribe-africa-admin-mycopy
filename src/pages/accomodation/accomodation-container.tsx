import { useParams } from 'react-router';
import AccomodationScreen from './accomodation-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';

const AccomodationContainer = () => {
  const { accomodationId } = useParams();
  // Use React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['accomodationData', accomodationId],
    queryFn: () => sanity.GET(query.ACCOMMODATION.LIST),
  });

  return <AccomodationScreen data={data} error={error} isLoading={isLoading} />;
};

export default AccomodationContainer;
