import { useState } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import { carouselData } from '@data/index';
import { LeftButton, RightButton } from '@molecules/carousel/common-carousel';

const BusinessFriendly: React.FC = () => {
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
    <div className="mx-auto w-full flex flex-col max-w-6xl p-2 md:p-4">
      <div className="ms-auto flex flex-col items-end">
        <DualHeading>Business *Friendly*</DualHeading>
        <p className="mt-2 text-sm text-gray-600">Great work-life balance</p>
      </div>
      <div className="relative flex sm:flex-col items-center">
        {/* Text and Image */}
        <div className="w-full flex flex-col md:flex-row relative items-center m-2 md:m-4">
          {/* Text container */}
          <div className="absolute right-0 w-full h-full md:h-fit max-h-full md:w-3/5 md:mb-0 opacity-65 md:opacity-100 text-white bg-black md:text-black md:bg-white rounded-lg shadow-lg border border-orange-500">
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
          <div className=" w-full md:w-3/5 overflow-hidden rounded-lg shadow-lg -z-10">
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

export default BusinessFriendly;
