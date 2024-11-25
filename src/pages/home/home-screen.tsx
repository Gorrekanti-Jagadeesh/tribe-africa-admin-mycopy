import { HomeHeader } from '@molecules/header';
// Components importing from sections folder
import HeroSection from './sections/hero-section';
import Explore from './sections/explore';
import Experience from './sections/experience';
import Services from './sections/services';
import CharmingHotels from './sections/charming-hotels';
import HolidayDestination from './sections/holiday-destination';
import WorkingRemotely from './sections/working-remotely';
import BusinessFriendly from './sections/business-friendly';
import Footer from '@molecules/footer';
import Chatbot from '@atoms/common/chatbot';

const HomeScreen = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <HomeHeader />
      <div className="relative">
        <HeroSection />
        <Explore />
        <CharmingHotels />
        <HolidayDestination />
        <Experience />
        <WorkingRemotely />
        <BusinessFriendly />
        <Services />
      </div>
      <Footer />
      <div className="fixed bottom-0 right-0 m-2 lg:m-4 xl:mx-12">
        <Chatbot />
      </div>
    </div>
  );
};

export default HomeScreen;
