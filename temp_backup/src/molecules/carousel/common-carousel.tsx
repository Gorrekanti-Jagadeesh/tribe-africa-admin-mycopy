import useScreenWidth from '@hooks/useScreenWidth';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const LeftButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute -left-2 lg:-left-8 md:-left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full border border-gray-500 size-8 md:size-12 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
      }`}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};

export const RightButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute -right-2 lg:-right-8 md:-right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full border border-gray-500 size-8 md:size-12 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
      }`}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

export const CommonCarousel = ({ data, component }) => {
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
            className="w-full flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {data.map((item, index: number) => (
              <div key={index} className="w-1/2 lg:w-1/3 flex-shrink-0 p-1 cursor-pointer" onClick={item.onClick}>
                {component(item)}
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <LeftButton onClick={handlePrev} disabled={isPrevDisabled} />

        {/* Right Arrow */}
        <RightButton onClick={handleNext} disabled={isNextDisabled} />
      </div>
    </div>
  );
};
