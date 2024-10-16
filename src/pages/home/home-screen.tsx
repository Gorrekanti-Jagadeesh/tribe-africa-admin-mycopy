import React from 'react';
import { HomeHeader } from '../../molecules/header/home-header';
import Footer from '../../molecules/footer/footer';
// Components importing from sections folder
import HeroSection from './hero-section/hero-screen';
import Explore from './explore-section/explore-screen';
import Experience from './experience-section/experience-screen';
import Services from './services-section/services-screen';
import CharmingHotels from './hotels-section/hotels-screen';

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
