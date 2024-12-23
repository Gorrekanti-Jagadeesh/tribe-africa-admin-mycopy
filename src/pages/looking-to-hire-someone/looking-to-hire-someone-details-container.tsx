import { useLocation } from 'react-router-dom';
import LookingToHireSomeoneDetailsScreen from './looking-to-hire-someone-details-screen';

const LookingToHireSomeoneDetailsContainer: React.FC = () => {
  const { state } = useLocation();
  return <LookingToHireSomeoneDetailsScreen proffesionalPersonData={state} />;
};

export default LookingToHireSomeoneDetailsContainer;
