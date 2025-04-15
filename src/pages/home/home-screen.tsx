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
  return (
    <div className="max-w-screen-2xl m-auto">
      <HomeHeader />
      <div className="relative">
        <Explore data={exploreData} loading={exploreLoading} error={exploreError} />
        <CharmingHotels data={hotelsData} loading={hotelsLoading} error={hotelsError} />
        <HolidayDestination data={destinationsData} loading={destinationsLoading} error={destinationsError} />
        <Experience />
        <WorkingRemotely data={workingRemotelyData} loading={workingRemotelyLoading} error={workingRemotelyError} />
        <BusinessFriendly data={BusinessFriendlyData} loading={BusinessFriendlyLoading} error={BusinessFriendlyError} />
        <Services data={servicesData} loading={servicesLoading} error={servicesError} />
      </div>
      <Footer />
      <div className="fixed bottom-0 right-0 m-2 lg:m-4 xl:mx-12 z-20">
        <Chatbot />
      </div>
    </div>
  );
};

export default HomeScreen;
