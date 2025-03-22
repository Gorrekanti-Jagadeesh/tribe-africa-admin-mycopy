import { jsx as _jsx } from 'react/jsx-runtime';
import FindaBusinessDetailsScreen from './find-a-business-details-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { useParams } from 'react-router';
import { Loading } from '@/atoms/common/loading';
const FindaBusinessDetailsContainer = () => {
  const { id } = useParams();
  const fetchFindABusinessData = async () => {
    const data = await sanity.GET(query.BUSINESS.NETWORK.FIND_A_BUSINESS_DETAILS(id));
    return data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['find-a-business-details'],
    queryFn: fetchFindABusinessData, // Use the structureFunction for fetching and formatting data
  });
  console.log(data);
  if (isLoading) {
    return _jsx('div', { className: 'h-screen flex justify-center items-center', children: _jsx(Loading, {}) });
  }
  if (error) {
    return _jsx('h1', { children: 'Error Occur' });
  }
  return _jsx(FindaBusinessDetailsScreen, { data: data });
};
export default FindaBusinessDetailsContainer;
