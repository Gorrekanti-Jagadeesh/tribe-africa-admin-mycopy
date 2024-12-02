import useScreenWidth from '@hooks/useScreenWidth';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface carouselCardProps {
  image: string | undefined;
  title: string;
  onClick?: () => void;
}

interface commonCarouselData {
  data: carouselCardProps[];
}

const CommonCarousel: React.FC<commonCarouselData> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const screenWidth = useScreenWidth();

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

  useEffect(() => {
    if (screenWidth < 1024) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  }, [screenWidth]);

  return (
    <div>
      <div className="relative w-full flex">
        {/* Carousel Images */}
        <div className="flex overflow-hidden w-full ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {data.map((item: carouselCardProps, index: number) => (
              <div
                key={index}
                className="w-1/2 lg:w-1/3 flex-shrink-0 p-1 md:p-2 cursor-pointer"
                onClick={item.onClick}
              >
                <img
                  src={item.image}
                  alt={`carousel-${index}`}
                  className="w-full object-cover rounded-lg cursor-pointer aspect-square"
                />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className={`absolute -left-2 md:-left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full border border-gray-500 size-8 md:size-16 ${
            isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`absolute -right-2 md:-right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full border border-gray-500 size-8 md:size-16 ${
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default CommonCarousel;
