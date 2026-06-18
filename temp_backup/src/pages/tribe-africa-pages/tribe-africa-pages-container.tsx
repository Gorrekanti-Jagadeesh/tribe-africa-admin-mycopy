import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import TribeAfricaPagesScreen from './tribe-africa-pages-screen';
import { Loading } from '@atoms/common/loading';
import { query, sanity } from '@utils/sanity';
import { fromKebabCase, toKebabCase } from '@utils/common';

// const fetchCategoryData = (category: string | undefined) => {
//   switch (category) {
//     case 'ministries':
//     case 'police':
//     case 'nationalboards':
//       return [
//         {
//           id: '1',
//           department: 'Presidency',
//           location: 'Algiers',
//           phoneNumber: '223 78888888',
//           websiteUrl: 'info@el-mouridia.dz',
//           imageUrl: ministerImage,
//           description: 'Responsible for national leadership and governance.',
//         },
//         {
//           id: '2',
//           department: 'Presidency',
//           location: 'Algiers',
//           phoneNumber: '223 78888888',
//           websiteUrl: 'info@el-mouridia.dz',
//           imageUrl: ministerImage,
//           description: 'Responsible for national leadership and governance.',
//         },
//         {
//           id: '3',
//           department: 'Presidency',
//           location: 'Algiers',
//           phoneNumber: '223 78888888',
//           websiteUrl: 'info@el-mouridia.dz',
//           imageUrl: ministerImage,
//           description: 'Responsible for national leadership and governance.',
//         },
//         {
//           id: '4',
//           department: 'Presidency',
//           location: 'Algiers',
//           phoneNumber: '223 78888888',
//           websiteUrl: 'info@el-mouridia.dz',
//           imageUrl: ministerImage,
//           description: 'Responsible for national leadership and governance.',
//         },
//       ];
//     default:
//       return [];
//   }
// };

const TribeAfricaPagesContainer: React.FC = () => {
  const { country, subcategory } = useParams();

  const structureFunction = async () => {
    const data = await sanity.GET(query.BUSINESS.NETWORK.GOVT_OFFICIALS(fromKebabCase(country)));

    // console.log('this is gove officials data...', data);
    return data;
  };

  const {
    data: categoryData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['govt-officials', country],
    queryFn: structureFunction, // Use the structureFunction for fetching and formatting data
  });

  // const { data: categoryData, isLoading } = useQuery({
  //   queryKey: ['categoryData', subcategory],
  //   queryFn: () => fetchCategoryData(subcategory),
  // });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  if (error) {
    return 'Something is wrong';
  }

  return <TribeAfricaPagesScreen data={categoryData || []} category={toKebabCase(subcategory)} />;
};

export default TribeAfricaPagesContainer;
