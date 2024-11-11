// containers/AccomodationContainer.tsx

import { useParams } from 'react-router';
import AccomodationScreen from './accomodation-screen';
import demo from '../../../assets/homepage-welcome-image-3.png';

const AccomodationContainer = () => {
  const { accomodationId } = useParams();

  // Sample data for list and view
  const hotelData = {
    name: 'Hotel XYZ',
    rating: '3',
    images: [demo, demo, demo],
    description: `Ocean Bay Hotel & Resort is an excellent choice for travelers...`,
    reviewCount: '101',
    address: 'Kofi Annan Street, Bakau Algeria',
    phone: '23394745677',
    website: 'www.hotelxyz.com',
  };

  const reviews = [
    {
      user_name: 'Messi',
      user_image: demo,
      date: '4th Oct 2024',
      description: 'This place is amazing! The staff was very friendly...',
      images: [demo, demo, demo],
      ratings: [
        { title: 'Quality of Service', rating: '5' },
        { title: 'Comfort', rating: '4' },
        { title: 'Food & Beverage', rating: '4' },
        { title: 'Location', rating: '3' },
        { title: 'Cleanliness', rating: '5' },
      ],
    },
    // More review objects here...
  ];

  // Dummy data for accommodation list
  const data = [
    {
      name: 'Hotel XYZ',
      image: demo,
      rating: '3',
      review_count: '101',
      distance: '5 km',
      price: '$120',
    },
    // Add more hotels to the list here...
  ];

  return <AccomodationScreen accomodationId={accomodationId} data={data} hotelData={hotelData} reviews={reviews} />;
};

export default AccomodationContainer;
