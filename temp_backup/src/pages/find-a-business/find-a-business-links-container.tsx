import { useParams } from 'react-router';
import FindABusinessScreen from './find-a-business-links-screen';

const FindABusinessLinksContainer = () => {
  const { country } = useParams();
  return <FindABusinessScreen country={country} />;
};

export default FindABusinessLinksContainer;
