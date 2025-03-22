import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { HomeHeader } from '@molecules/header';
// Components importing from sections folder
import Explore from './sections/explore';
import Experience from './sections/experience';
import Services from './sections/services';
import CharmingHotels from './sections/charming-hotels';
import HolidayDestination from './sections/holiday-destination';
import WorkingRemotely from './sections/working-remotely';
import BusinessFriendly from './sections/business-friendly';
import Footer from '@molecules/footer';
import Chatbot from '@atoms/common/chatbot';
const HomeScreen = ({ props }) => {
  const {
    exploreData,
    exploreError,
    exploreLoading,
    hotelsData,
    hotelsError,
    hotelsLoading,
    destinationsData,
    destinationsError,
    destinationsLoading,
    workingRemotelyData,
    workingRemotelyError,
    workingRemotelyLoading,
    BusinessFriendlyData,
    BusinessFriendlyError,
    BusinessFriendlyLoading,
    servicesData,
    servicesError,
    servicesLoading,
  } = props;
  return _jsxs('div', {
    className: 'max-w-screen-2xl m-auto',
    children: [
      _jsx(HomeHeader, {}),
      _jsxs('div', {
        className: 'relative',
        children: [
          _jsx(Explore, { data: exploreData, loading: exploreLoading, error: exploreError }),
          _jsx(CharmingHotels, { data: hotelsData, loading: hotelsLoading, error: hotelsError }),
          _jsx(HolidayDestination, { data: destinationsData, loading: destinationsLoading, error: destinationsError }),
          _jsx(Experience, {}),
          _jsx(WorkingRemotely, {
            data: workingRemotelyData,
            loading: workingRemotelyLoading,
            error: workingRemotelyError,
          }),
          _jsx(BusinessFriendly, {
            data: BusinessFriendlyData,
            loading: BusinessFriendlyLoading,
            error: BusinessFriendlyError,
          }),
          _jsx(Services, { data: servicesData, loading: servicesLoading, error: servicesError }),
        ],
      }),
      _jsx(Footer, {}),
      _jsx('div', { className: 'fixed bottom-0 right-0 m-2 lg:m-4 xl:mx-12 z-20', children: _jsx(Chatbot, {}) }),
    ],
  });
};
export default HomeScreen;
