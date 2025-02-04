import FindaBusinessDetailsScreen from './find-a-business-details-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { useParams } from 'react-router';
import { Loading } from '@/atoms/common/loading';

const FindaBusinessDetailsContainer = () => {
  const { id } = useParams();

  const fetchFindABusinessData = async () => {
    const data = await sanity.GET(query.BUSINESS.NETWORK.FIND_A_BUSINESS_DETAILS(id));
    return data[0];
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['find-a-business-details'],
    queryFn: fetchFindABusinessData, // Use the structureFunction for fetching and formatting data
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <h1>Error Occur</h1>;
  }

  return <FindaBusinessDetailsScreen data={data} />;
};

export default FindaBusinessDetailsContainer;
