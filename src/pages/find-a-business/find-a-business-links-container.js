import { jsx as _jsx } from 'react/jsx-runtime';
import { useParams } from 'react-router';
import FindABusinessScreen from './find-a-business-links-screen';
const FindABusinessLinksContainer = () => {
  const { country } = useParams();
  return _jsx(FindABusinessScreen, { country: country });
};
export default FindABusinessLinksContainer;
