import React from 'react';
import ExploreScreen from './explore-screen';
import spiralBackground from '../../../assets/branding-bg-dark.png';
import welcomeImage1 from '../../../assets/homepage-welcome-image.png';
import welcomeImage2 from '../../../assets/homepage-welcome-image-2.png';
import welcomeImage3 from '../../../assets/homepage-welcome-image-3.png';
import TAlogo from '../../../assets/tribe-africa-logo.png';

const ExploreContainer: React.FC = () => {
  return (
    <ExploreScreen
      spiralBackground={spiralBackground}
      welcomeImage1={welcomeImage1}
      welcomeImage2={welcomeImage2}
      welcomeImage3={welcomeImage3}
      TAlogo={TAlogo}
    />
  );
};

export default ExploreContainer;
