import { jsx as _jsx } from 'react/jsx-runtime';
import { useLocation } from 'react-router';
import TribeAfricaPagesDetailsScreen from './tribe-africa-pages-details-screen';
const TribeAfricaPagesDetailsContainer = () => {
  const location = useLocation();
  const details = location.state;
  return _jsx(TribeAfricaPagesDetailsScreen, { tribeAfricaPageDetails: details });
};
export default TribeAfricaPagesDetailsContainer;
