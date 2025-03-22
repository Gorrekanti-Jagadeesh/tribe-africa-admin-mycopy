import { jsx as _jsx } from 'react/jsx-runtime';
import { useParams } from 'react-router';
import DestinationDetailsScreen from './details-screen';
const DestinationDetailsContainer = () => {
  const { name } = useParams();
  return _jsx(DestinationDetailsScreen, { name: name || '' });
};
export default DestinationDetailsContainer;
