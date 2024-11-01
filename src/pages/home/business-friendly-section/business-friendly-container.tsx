import { useState } from 'react';
import BusinessFriendlyScreen from './business-friendly-screen';
import { carouselData } from '../../../data';

const BusinessFriendly = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < carouselData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <BusinessFriendlyScreen
      carouselData={carouselData}
      currentIndex={currentIndex}
      handleNext={handleNext}
      handlePrev={handlePrev}
    />
  );
};

export default BusinessFriendly;
