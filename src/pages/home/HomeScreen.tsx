import React from 'react';
import Navbar from '../../molecules/header/HomeHeader';
import Footer from '../../molecules/footer/Footer';
// Components importing from sections folder
import HeroSection from './hero-section/HeroScreen';
import Explore from './explore-section/ExploreScreen';
import Experience from './experience-section/ExperienceScreen';
import Services from './experience-section/services-section/ServicesScreen';

const HomeScreen: React.FC = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <Navbar />
      <div>
        <HeroSection />
        <Explore />
        <Experience />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
