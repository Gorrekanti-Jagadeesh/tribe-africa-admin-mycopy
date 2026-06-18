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

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Data not loaded yet..</div>;

  return (
    <NavFloatingLayout categories={data.allCategories} heading={'Out & About'} country={country} pageType="holiday" />
  );
};

export default OutAndAbout;
