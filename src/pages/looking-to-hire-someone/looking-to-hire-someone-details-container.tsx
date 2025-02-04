import LookingToHireSomeoneDetailsScreen from './looking-to-hire-someone-details-screen';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getEntryDataById } from '@api/index';
import { Loading } from '@atoms/common/loading';
const LookingToHireSomeoneDetailsContainer: React.FC = () => {
  const { proffessionalId } = useParams();

  const {
    data: data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['events-details-page'],
    queryFn: () => getEntryDataById(proffessionalId), // Handle undefined 'country'
  });

  if (isLoading) return <Loading />;
  if (error) return 'Error Occured';

  return <LookingToHireSomeoneDetailsScreen proffesionalPersonData={data} />;
};

export default LookingToHireSomeoneDetailsContainer;
