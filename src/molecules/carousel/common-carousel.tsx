import useScreenWidth from '@hooks/useScreenWidth';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/* Figma: backward/forward buttons — 60×61, white bg, radius=30.57 (≈ rounded-full), pad=14px all */
export const LeftButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute -left-8 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
      }`}
      style={{ width: '60px', height: '61px', padding: '14px' }}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-base" />
    </button>
  );
};

export const RightButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute -right-8 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
      }`}
      style={{ width: '60px', height: '61px', padding: '14px' }}
    >
      <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-base" />
    </button>
  );
};

export const CommonCarousel = ({ data, component }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const screenWidth = useScreenWidth();

  const handleNext = () => {
    if (currentIndex + itemsPerPage < data.length) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const isNextDisabled = currentIndex >= data.length - itemsPerPage;
  const isPrevDisabled = currentIndex === 0;

  useEffect(() => {
    if (screenWidth < 1024) setItemsPerPage(2);
    else setItemsPerPage(3);
  }, [screenWidth]);

  return (
    <div>
      {/* px-10 gives room for the 60px absolute-positioned nav buttons */}
      <div className="relative w-full flex px-10">
        <div className="flex overflow-hidden w-full">
          <div
            className="w-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {data.map((item, index: number) => (
              <div key={index} className="w-1/2 lg:w-1/3 flex-shrink-0 px-2 cursor-pointer" onClick={item.onClick}>
                {component(item)}
              </div>
            ))}
          </div>
        </div>

        <LeftButton onClick={handlePrev} disabled={isPrevDisabled} />
        <RightButton onClick={handleNext} disabled={isNextDisabled} />
      </div>
    </div>
  );
};
