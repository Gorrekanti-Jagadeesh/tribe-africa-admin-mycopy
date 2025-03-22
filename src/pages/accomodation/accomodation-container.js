import { jsx as _jsx } from 'react/jsx-runtime';
import { useParams } from 'react-router';
import AccomodationScreen from './accomodation-screen';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';
const AccomodationContainer = () => {
  const { country, sub_category, category } = useParams();
  // Use React Query to fetch data
  // const { data, error, isLoading } = useQuery({
  //   queryKey: [],
  //   queryFn: () =>
  //     sanity.GET(`*[_type == "accommodation" && country == "${fromKebabCase(country)}" && categoryType == "${fromKebabCase(sub_category)}"]{
  //     _id, name, phone_no, website, amount, images[0], reviews
  //   }`),
  // });
  const { data, error, isLoading } = useQuery({
    queryKey: ['accommodationListData'],
    queryFn: async () => {
      try {
        const response =
          await sanity.GET(`*[_type == "accomodationList" && address.country == "${fromKebabCase(country)}" && accommodation_type == "${sub_category}"]{
          _id, 
          name, 
          "phone_no": contact.phoneNumber, 
          "website": contact.website, 
          amount, 
          "images": uploadedPhotoshotel.exterior[0],
        }`);
        console.log('Sanity Data:', response);
        return response;
      } catch (err) {
        console.error('Sanity Fetch Error:', err);
        throw err;
      }
    },
  });
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['accommodationListData'],
  //   queryFn: async () => await sanityClient.fetch(`*[_type == "accomodationList"]`),
  // });
  console.log('Data:------', sub_category, country, data);
  console.log('Error:', error);
  return _jsx(AccomodationScreen, {
    data: data,
    error: error,
    isLoading: isLoading,
    country: country,
    category: category,
    subCategory: sub_category,
  });
};
export default AccomodationContainer;
