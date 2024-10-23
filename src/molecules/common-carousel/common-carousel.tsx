import React, { useState } from 'react';

interface carouselCardProps {
  image: string | undefined;
  title: string;
  handleClick: () => void;
}

interface commonCarouselData {
  data: carouselCardProps[];
}

const CommonCarousel: React.FC<commonCarouselData> = ({ data }) => {
  if (!data) return;
  console.log(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  let itemsPerPage = 0;

  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    itemsPerPage = 1;
  } else if (screenWidth < 1024) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 3;
  }

  const handleNext = () => {
    if (currentIndex + itemsPerPage < data.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isNextDisabled = currentIndex >= data.length - itemsPerPage;
  const isPrevDisabled = currentIndex == 0;

  return (
    <div>
      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className={`absolute left-0 md:left-2 lg:left-7 top-1/2 border-2 border-slate-200 transform -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white rounded-full p-0 border border-gray-500 ${
            isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <span className="text-4xl">&#8249;</span>
        </button>

        {/* Carousel Images */}
        <div className="flex overflow-hidden w-11/12">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {data.map((item: carouselCardProps, index: number) => (
              <div
                key={index}
                className="w-full px-2 sm:w-1/1 md:w-1/2 lg:w-1/3 flex-shrink-0 p-6 cursor-pointer"
                style={{ minWidth: '33.3333%' }}
                onClick={item.handleClick}
              >
                <img
                  src={item.image}
                  alt={`carousel-${index}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`absolute right-0 md:right-2 lg:right-7 border-2 border-slate-200 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white rounded-full p-0 border border-gray-500 ${
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <span className="text-4xl">&#8250;</span>
        </button>
      </div>
      {/* Image title */}
      {/* <div className="flex overflow-hidden w-11/12 mx-auto">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {data.map(( item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
              style={{ minWidth: '33.3333%' }}
            >
              <p className="text-lg font-semibold text-ellipsis">{item.title}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default CommonCarousel;
