import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ministerImage from '../../assets/minister-image.png';
import TribeAfricaPagesScreen from './tribe-africa-pages-screen';
import { Loading } from '@atoms/common/loading';

const fetchCategoryData = (category: string | undefined) => {
  switch (category) {
    case 'ministries':
    case 'police':
    case 'national-boards':
      return [
        {
          id: '1',
          department: 'Presidency',
          location: 'Algiers',
          phoneNumber: '223 78888888',
          websiteUrl: 'info@el-mouridia.dz',
          imageUrl: ministerImage,
          description: 'Responsible for national leadership and governance.',
        },
        {
          id: '2',
          department: 'Presidency',
          location: 'Algiers',
          phoneNumber: '223 78888888',
          websiteUrl: 'info@el-mouridia.dz',
          imageUrl: ministerImage,
          description: 'Responsible for national leadership and governance.',
        },
        {
          id: '3',
          department: 'Presidency',
          location: 'Algiers',
          phoneNumber: '223 78888888',
          websiteUrl: 'info@el-mouridia.dz',
          imageUrl: ministerImage,
          description: 'Responsible for national leadership and governance.',
        },
        {
          id: '4',
          department: 'Presidency',
          location: 'Algiers',
          phoneNumber: '223 78888888',
          websiteUrl: 'info@el-mouridia.dz',
          imageUrl: ministerImage,
          description: 'Responsible for national leadership and governance.',
        },
      ];
    default:
      return [];
  }
};

const TribeAfricaPagesContainer: React.FC = () => {
  const { category } = useParams();

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ['categoryData', category],
    queryFn: () => fetchCategoryData(category),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  return <TribeAfricaPagesScreen data={categoryData || []} category={category} />;
};

export default TribeAfricaPagesContainer;
