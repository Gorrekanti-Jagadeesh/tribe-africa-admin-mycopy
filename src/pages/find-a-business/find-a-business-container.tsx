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
    if (main_category == 'wellnessbeauty') {
      const data =
        await sanity.GET(`*[_type == "businessType" && businessAddress.country == "${fromKebabCase(country)}" && businessCategory == "${main_category}" && businessSubCategory == "${sub_category}"]{
      _id,
  businessName,
  "address":businessAddress
      "businessContactInformation":businessContactInformation,
      "image": businessLogo
      }`);
      return data;
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
