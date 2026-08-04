import { useLocation } from 'react-router';
import TribeAfricaPagesDetailsScreen from './tribe-africa-pages-details-screen';

const TribeAfricaPagesDetailsContainer: React.FC = () => {
  const location = useLocation();
  const details = location.state;

  return <TribeAfricaPagesDetailsScreen tribeAfricaPageDetails={details} />;
};

export default TribeAfricaPagesDetailsContainer;
