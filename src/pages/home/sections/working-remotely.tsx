import { useState } from 'react';
import DualHeading from '../../../atoms/heading/dual-heading';

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
    <div className="mx-auto w-full max-w-6xl p-2 md:p-4">
      <div>
        <DualHeading>Great For *Working Remotely*</DualHeading>
        <p className="mt-2 text-lg text-gray-600">Best digital Nomad Destinations in Africa</p>
      </div>
      <div className="relative flex sm:flex-col items-center p-4">
        {/* Left Arrow */}

        {/* Text and Image */}
        <div className="w-full flex flex-col md:flex-row relative items-center">
          {/* Text container */}
          <div className="w-full mb-3 relative bg-white rounded-lg shadow-lg md:max-w-md">
            <div className="bg-white p-8 -z-10 pl-10 rounded-lg shadow-lg w-full md:max-w-[53rem] md:w-[130%]">
              <h2 className="text-xl font-semibold mb-2">{carouselData[currentIndex].title}</h2>
              <p className="text-gray-600">{carouselData[currentIndex].description}</p>
            </div>
          </div>

          {/* Image container */}
          <div className="w-full relative overflow-hidden rounded-lg shadow-lg border border-slate-300 -z-20">
            <img
              src={carouselData[currentIndex].image}
              alt={carouselData[currentIndex].title}
              className="h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        <button
          className={`absolute left-0 z-0 md:-left-4 top-2/3 md:top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg border w-12 h-12 md:w-16 md:h-16 border-slate-300 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          {/* ◀ */}
          <span className="text-4xl leading-6">&#8249;</span>
        </button>

        {/* Right Arrow */}
        <button
          className={`absolute right-0 md:-right-4 top-2/3 md:top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full w-12 md:w-16 aspect-square shadow-lg border border-slate-300 ${
            currentIndex === carouselData.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleNext}
          disabled={currentIndex === carouselData.length - 1}
        >
          <span className="text-4xl leading-6">&#8250;</span>
        </button>
      </div>
    </div>
  );
};

export default WorkingRemotely;
