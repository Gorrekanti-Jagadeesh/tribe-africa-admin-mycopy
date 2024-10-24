import { useState } from 'react';
import WorkingRemotelyScreen from './working-remotely-screen';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    title: 'Title 1',
    description: 'Description 1',
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  },
  {
    id: 2,
    title: 'Title 2',
    description: 'Description 2',
    image: 'https://cdn.fstoppers.com/styles/full/s3/media/2019/12/04/nando-jpeg-quality-001.jpg',
  },
  {
    id: 3,
    title: 'Title 3',
    description: 'Description 3',
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  },
  {
    id: 4,
    title: 'Title 4',
    description: 'Description 4',
    image: 'https://cdn.fstoppers.com/styles/full/s3/media/2019/12/04/nando-jpeg-quality-001.jpg',
  },
  {
    id: 5,
    title: 'Title 5',
    description: 'Description 5',
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  },
  // Add more carousel items here as needed
];

const WorkingRemotelyContainer: React.FC = () => {
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

export default WorkingRemotelyContainer;
