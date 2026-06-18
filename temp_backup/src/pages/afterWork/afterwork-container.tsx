import { useParams } from 'react-router';
import AfterWorkScreen from './afterwork-screen';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';

const AfterWorkContainer = () => {
  const { country, sub_category, category } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['afterWorkListingData'],
    queryFn: async () => {
      try {
        const response =
          await sanity.GET(`*[_type == "afterWorkListing" && businessDetails.address.country == "${fromKebabCase(country)}" && businessType == "${category}" && restaurantSubCategory == "${sub_category}"]{
          _id,
          "name": businessDetails.businessName,
          "phone_no": businessContact.phoneNumber,
          "website": businessContact.website,
          "images": businessPhotos[0]
        }`);
        console.log('Sanity Data:', response);
        return response;
      } catch (err) {
        console.error('Sanity Fetch Error:', err);
        throw err;
      }
    },
  });

  console.log('Data1:------', category, sub_category, fromKebabCase(country), data);
  console.log('Error:', error);

  return (
    <AfterWorkScreen
      data={data}
      error={error}
      isLoading={isLoading}
      country={country}
      category={category}
      subCategory={sub_category}
    />
  );
};

export default AfterWorkContainer;
