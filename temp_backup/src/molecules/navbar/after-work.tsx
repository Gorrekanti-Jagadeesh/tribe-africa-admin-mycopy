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

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Data not loaded yet..</div>;

  return (
    <NavFloatingLayout categories={data.allCategories} heading={'After Work'} country={country} pageType={'business'} />
  );
};

export default AfterWork;
