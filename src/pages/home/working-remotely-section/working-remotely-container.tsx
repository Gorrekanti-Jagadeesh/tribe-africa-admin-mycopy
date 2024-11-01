import { useState } from 'react';
import WorkingRemotelyScreen from './working-remotely-screen';

import { carouselData } from '../../../data';

const WorkingRemotely: React.FC = () => {
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
    <WorkingRemotelyScreen
      carouselData={carouselData}
      currentIndex={currentIndex}
      handleNext={handleNext}
      handlePrev={handlePrev}
    />
  );
};

export default WorkingRemotely;
