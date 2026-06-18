import { useParams } from 'react-router';
import DestinationDetailsScreen from './details-screen';

const DestinationDetailsContainer = () => {
  const { name } = useParams<{ name: string }>();
  return <DestinationDetailsScreen name={name || ''} />;
};

export default DestinationDetailsContainer;
