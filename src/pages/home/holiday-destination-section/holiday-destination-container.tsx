import { useState, useEffect } from 'react';
import HolidayDestinationScreen from './holiday-destination-screen';

const images = [
  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp',
  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(65).webp',
  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(11).webp',
  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(99).webp',
  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(41).webp',
];

const titles = ['One', 'Two', 'Three', 'Four', 'Five'];

const HolidayDestinationContainer: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getClassNames = (index: number) => {
    if (index === activeIndex) return 'active-slide';
    if (index === (activeIndex + 1) % images.length) return 'right-slide';
    if (index === (activeIndex + 2) % images.length) return 'far-right-slide';
    if (index === (activeIndex - 1 + images.length) % images.length) return 'left-slide';
    if (index === (activeIndex - 2 + images.length) % images.length) return 'far-left-slide';
    return 'hidden-slide';
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleRightClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleLeftClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <HolidayDestinationScreen
      images={images}
      titles={titles}
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

export default HolidayDestinationContainer;
