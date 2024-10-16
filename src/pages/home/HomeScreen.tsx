import React from 'react';
import { HomeHeader } from '../../molecules/header/HomeHeader';
import Footer from '../../molecules/footer/Footer';
// Components importing from sections folder
import HeroSection from './hero-section/HeroScreen';
import Explore from './explore-section/ExploreScreen';
import Experience from './experience-section/ExperienceScreen';
import Services from './services-section/ServicesScreen';
import CharmingHotels from './hotels-section/HotelsScreen';

const HomeScreen: React.FC = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <HomeHeader />
      <div>
        <HeroSection />
        <Explore />
        {/* <CharmingHotels /> */}
        <Experience />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
