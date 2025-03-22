import { jsx as _jsx } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import NavFloatingLayout from '../layout/nav-floating-layout';
import { useParams } from 'react-router';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';
const OutAndAbout = () => {
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
    heading: 'Out & About',
    country: country,
    pageType: 'holiday',
  });
};
export default OutAndAbout;
