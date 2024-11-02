import { useState, useEffect } from 'react';
import HolidayDestinationScreen from './holiday-destination-screen';
import { HolidayDestinationData as destinations } from '../../../data';

const HolidayDestination: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getClassNames = (index: number) => {
    if (index === activeIndex) return 'active-slide';
    if (index === (activeIndex + 1) % destinations.length) return 'right-slide';
    if (index === (activeIndex + 2) % destinations.length) return 'far-right-slide';
    if (index === (activeIndex - 1 + destinations.length) % destinations.length) return 'left-slide';
    if (index === (activeIndex - 2 + destinations.length) % destinations.length) return 'far-left-slide';
    return 'hidden-slide';
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleRightClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const handleLeftClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };

  return (
    <HolidayDestinationScreen
      data={destinations}
      activeIndex={activeIndex}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      getClassNames={getClassNames}
      handleDotClick={handleDotClick}
      handleRightClick={handleRightClick}
      handleLeftClick={handleLeftClick}
    />
  );
};

export default HolidayDestination;
