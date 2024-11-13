import React from 'react';
import { HomeHeader } from '../../molecules/header';
// Components importing from sections folder
import HeroSection from './hero-section/hero-container';
import Explore from './explore-section/explore-container';
import Experience from './experience-section/experience-container';
import Services from './services-section/services-container';
import CharmingHotels from './hotels-section/hotels-container';
import HolidayDestination from './holiday-destination-section/holiday-destination-container';
import WorkingRemotely from './working-remotely-section/working-remotely-container';
import BusinessFriendly from './business-friendly-section/business-friendly-container';
import Footer from '../../molecules/footer';

const HomeScreen: React.FC = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <HomeHeader />
      <div>
        <HeroSection />
        <Explore />
        {/* <CharmingHotels /> */}
        <HolidayDestination />
        <Experience />
        <WorkingRemotely />
        <BusinessFriendly />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
