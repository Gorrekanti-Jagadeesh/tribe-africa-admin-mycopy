import React from 'react';
import ExploreScreen from './explore-screen';
import spiralBackground from '../../../assets/branding-bg-dark.png';
import welcomeImage1 from '../../../assets/homepage-welcome-image.png';
import welcomeImage2 from '../../../assets/homepage-welcome-image-2.png';
import welcomeImage3 from '../../../assets/homepage-welcome-image-3.png';

const Explore: React.FC = () => {
  return (
    <ExploreScreen
      background={spiralBackground}
      welcomeImage1={welcomeImage1}
      welcomeImage2={welcomeImage2}
      welcomeImage3={welcomeImage3}
    />
  );
};

export default Explore;
