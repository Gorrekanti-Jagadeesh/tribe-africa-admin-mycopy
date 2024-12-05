import { useState } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import { LeftButton, RightButton } from '@molecules/carousel/common-carousel';

import { carouselData } from '@data/index';

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
    <div className="w-full max-w-6xl m-auto p-2 md:p-4">
      <div>
        <DualHeading>Great For *Working Remotely*</DualHeading>
        <p className="mt-2 text-sm text-gray-600">Best digital Nomad Destinations in Africa</p>
      </div>
      <div className="relative flex sm:flex-col items-center">
        {/* Text and Image */}
        <div className="w-full flex flex-col md:flex-row relative items-center m-2 md:m-4">
          {/* Text container */}
          <div className="absolute left-0 w-full h-full md:h-fit md:w-3/5 md:mb-0 opacity-65 md:opacity-100 text-white bg-black md:text-black md:bg-white rounded-lg shadow-lg border border-orange-500">
            <div className="p-2 md:p-4 w-full h-full flex flex-col truncate">
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{carouselData[currentIndex].title}</h2>
                <p className="md:text-gray-600">{carouselData[currentIndex].description}</p>
              </div>
              <a href="" className="ms-auto text-blue-500">
                Know more
              </a>
            </div>
          </div>

          {/* Image container */}
          <div className=" w-full md:w-3/5 ms-auto overflow-hidden rounded-lg shadow-lg -z-10">
            <img
              src={carouselData[currentIndex].image}
              alt={carouselData[currentIndex].title}
              className="h-64 md:h-80 lg:h-96 w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Left Arrow */}
        <LeftButton onClick={handlePrev} disabled={currentIndex === 0} />

        {/* Right Arrow */}
        <RightButton onClick={handleNext} disabled={currentIndex === carouselData.length - 1} />
      </div>
    </div>
  );
};

export default WorkingRemotely;
