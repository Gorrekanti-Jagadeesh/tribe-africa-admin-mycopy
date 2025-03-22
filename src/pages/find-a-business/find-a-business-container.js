import { jsx as _jsx } from 'react/jsx-runtime';
import { useParams } from 'react-router';
import FindABusinessScreen from './find-a-business-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { fromKebabCase } from '@/utils/common';
import { Loading } from '@/atoms/common/loading';
const FindABusinessContainer = () => {
  const { country, main_category, sub_category } = useParams();
  // console.log('this is log details...', country, main_category, sub_category);
  const fetchFindABusinessData = async () => {
    // Fetching data from the API
    const data = await sanity.GET(
      query.BUSINESS.NETWORK.FIND_A_BUSINESS_DATA(fromKebabCase(country), main_category, sub_category)
    );
    return data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['find-a-business-data'],
    queryFn: fetchFindABusinessData, // Use the structureFunction for fetching and formatting data
  });
  if (isLoading) {
    return _jsx('div', { className: 'h-screen flex justify-center items-center', children: _jsx(Loading, {}) });
  }
  console.log(data);
  if (error) {
    return _jsx('h1', { children: 'Error Occur' });
  }
  return _jsx(FindABusinessScreen, { data: data, mainCategory: main_category, subCategory: sub_category });
};
export default FindABusinessContainer;
