import { useParams } from 'react-router';
import FindABusinessScreen from './find-a-business-screen';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { fromKebabCase } from '@/utils/common';
import { Loading } from '@/atoms/common/loading';

const FindABusinessContainer = () => {
  const { country, main_category, sub_category } = useParams();
  console.log('this is log details...1', country, main_category, sub_category);

  const fetchFindABusinessData = async () => {
    if (main_category == 'wellnessbeauty' || main_category == 'forchildren' || main_category == 'shopping') {
      var dataString;
      if (sub_category) {
        dataString = await sanity.GET(
          `*[_type == "businessType" && businessAddress.country == "${fromKebabCase(country)}" && businessCategory == "${main_category}" && businessSubCategory == "${sub_category}"]`
        );
      } else {
        dataString = await sanity.GET(
          `*[_type == "businessType" && businessAddress.country == "${fromKebabCase(country)}" && businessCategory == "${main_category}"]`
        );
      }

      console.log('------ new1', dataString);

      // Transform data
      const formattedData = dataString.map((item) => ({
        _id: item._id,
        businessName: item.businessName,
        address: {
          town: item.businessAddress?.city || '',
          state: item.businessAddress?.region || '',
          country: item.businessAddress?.country || '',
        },
        businessContactInformation: item.businessContactInformation || null,
        image: item.businessLogo || null,
      }));

      return formattedData;
    } else if (main_category == 'religiousinstitutions' || main_category == 'clubsspecialgroups') {
      console.log('nikhil...1', country, main_category, sub_category);
      var dataString;
      if (sub_category) {
        dataString = await sanity.GET(
          `*[_type == "institutionType" && businessAddress.country == "${fromKebabCase(country)}" && businessCategory == "${main_category}" && businessSubCategory == "${sub_category}"]`
        );
      } else {
        dataString = await sanity.GET(
          `*[_type == "businessType" && businessAddress.country == "${fromKebabCase(country)}" && businessCategory == "${main_category}"]`
        );
      }

      console.log('------ new1', dataString);

      // Transform data
      const formattedData = dataString.map((item) => ({
        _id: item._id,
        businessName: item.institutionName,
        address: {
          town: item.businessAddress?.city || '',
          state: item.businessAddress?.region || '',
          country: item.businessAddress?.country || '',
        },
        businessContactInformation: item.businessContactInformation || null,
        image: item.businessLogo || null,
      }));

      return formattedData;
    }
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
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  console.log(data);

  if (error) {
    return <h1>Error Occur</h1>;
  }

  return <FindABusinessScreen data={data} mainCategory={main_category} subCategory={sub_category} />;
};

export default FindABusinessContainer;
