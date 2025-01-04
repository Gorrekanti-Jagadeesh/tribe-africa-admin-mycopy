import { useParams } from 'react-router';
import AccomodationScreen from './accomodation-screen';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';

const AccomodationContainer = () => {
  const { country, sub_category, category } = useParams();
  // Use React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['accomodationData', country],
    queryFn: () =>
      sanity.GET(`*[_type == "accommodation" && country == "${fromKebabCase(country)}" && categoryType == "${fromKebabCase(sub_category)}"]{
      _id, name, phone_no, website, amount, images[0], reviews
    }`),
  });

  return (
    <AccomodationScreen
      data={data}
      error={error}
      isLoading={isLoading}
      country={country}
      category={category}
      subCategory={sub_category}
    />
  );
};

export default AccomodationContainer;
