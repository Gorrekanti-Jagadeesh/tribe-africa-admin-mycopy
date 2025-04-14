import FindaBusinessDetailsScreen from './find-a-business-details-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { useParams } from 'react-router';
import { Loading } from '@/atoms/common/loading';
import FindaBusinessDetailsTypeScreen from './find-a-business-details-religious-screen';

const FindaBusinessDetailsContainer = () => {
  const { id, main_category } = useParams();

  console.log('--------details page', id, main_category);
  const fetchFindABusinessData = async () => {
    if (main_category == 'wellnessbeauty' || main_category == 'forchildren') {
      const data = await sanity.GET(`*[_type == "businessType"  && _id == "${id}"]`);
      return data;
    } else if (main_category == 'religiousinstitutions' || main_category == 'clubsspecialgroups') {
      const data = await sanity.GET(`*[_type == "institutionType"  && _id == "${id}"]`);
      return data;
    }

    const data = await sanity.GET(query.BUSINESS.NETWORK.FIND_A_BUSINESS_DETAILS(id));
    return data;
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

  if (main_category == 'religiousinstitutions' || main_category == 'clubsspecialgroups') {
    return <FindaBusinessDetailsTypeScreen data={data[0]} />;
  } else {
    return <FindaBusinessDetailsScreen data={data[0]} />;
  }
};

export default FindaBusinessDetailsContainer;
