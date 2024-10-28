import React from 'react';
import { HomeHeader } from '../../molecules/header/home-header';
// Components importing from sections folder
import HeroContainer from './hero-section/hero-container';
import ExploreContainer from './explore-section/explore-container';
import ExperienceContainer from './experience-section/experience-container';
import Services from './services-section/services-screen';
import CharmingHotels from './hotels-section/hotels-container';
import HolidayDestinationContainer from './holiday-destination-section/holiday-destination-container';
import WorkingRemotelyContainer from './working-remotely-section/working-remotely-container';
import BusinessFriendlyContainer from './business-friendly-section/business-friendly-container';
import Footer from '../../molecules/footer/Footer';

const HomeScreen: React.FC = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <HomeHeader />
      <div>
        <HeroContainer />
        <ExploreContainer />
        <CharmingHotels />
        <HolidayDestinationContainer />
        <ExperienceContainer />
        <WorkingRemotelyContainer />
        <BusinessFriendlyContainer />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
