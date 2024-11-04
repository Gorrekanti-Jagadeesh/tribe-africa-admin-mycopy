import AccomodationScreen from './accomodation-screen';

import demo from '../../../assets/homepage-welcome-image.png';

const data = [
  {
    name: 'Hotel XYZ',
    image: demo,
    rating: '4',
    reviewCount: '50',
    distance: '1.7 km',
    price: 'AFN 9,430',
  },
];

const Accomodation = () => {
  return <AccomodationScreen data={data} />;
};

export default Accomodation;
