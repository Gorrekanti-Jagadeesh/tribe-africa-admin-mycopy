import BusinessScreen from './business-screen';
import { useParams } from 'react-router';

const BusinessContainer = () => {
  const { country } = useParams();
  return <BusinessScreen country={country} />;
};

export default BusinessContainer;
