import { jsx as _jsx } from 'react/jsx-runtime';
import { useParams } from 'react-router';
import NavFloatingLayout from '../layout/nav-floating-layout';
import { useQuery } from '@tanstack/react-query';
import { fromKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';
import { sanity } from '@utils/sanity';
const AfterWork = () => {
  const { country } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['after-work-data', country],
    queryFn: () => sanity.GET(`*[_type == "after-work" && country == "${fromKebabCase(country)}"][0]`),
  });
  if (isLoading) return _jsx(Loading, {});
  if (error) return _jsx('div', { children: 'Error loading data' });
  if (!data) return _jsx('div', { children: 'Data not loaded yet..' });
  return _jsx(NavFloatingLayout, {
    categories: data.allCategories,
    heading: 'After Work',
    country: country,
    pageType: 'business',
  });
};
export default AfterWork;
