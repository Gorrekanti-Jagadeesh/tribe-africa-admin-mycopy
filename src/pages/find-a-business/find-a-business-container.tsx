import { useParams } from 'react-router';
import FindABusinessScreen from './find-a-business-screen';

const FindABusinessContainer = () => {
  const { country } = useParams();
  return <FindABusinessScreen country={country} />;
};

export default FindABusinessContainer;
