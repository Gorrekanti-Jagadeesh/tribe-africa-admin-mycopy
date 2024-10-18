import React from 'react';
import { HomeHeader } from '../../molecules/header/home-header';
import Footer from '../../molecules/footer/footer';
// Components importing from sections folder
import HeroContainer from './hero-section/hero-container';
import ExploreContainer from './explore-section/explore-container';
import ExperienceContainer from './experience-section/experience-container';
import Services from './services-section/services-screen';
import CharmingHotels from './hotels-section/hotels-screen';

const HomeScreen: React.FC = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <HomeHeader />
      <div>
        <HeroContainer />
        <ExploreContainer />
        <CharmingHotels />
        <ExperienceContainer />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
