import React from 'react';
import './holiday-destination-styles.css';
import DualHeading from '../../../atoms/heading/dual-heading';
import Button from '../../../atoms/custom-button/button';

interface HolidayDestinationCarouselData {
  data: { title: string; image: string }[];
  activeIndex: number;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  getClassNames: (index: number) => string;
  handleDotClick: (index: number) => void;
  handleRightClick: () => void;
  handleLeftClick: () => void;
}

const HolidayDestinationScreen: React.FC<HolidayDestinationCarouselData> = ({
  data,
  activeIndex,
  isHovered,
  setIsHovered,
  getClassNames,
}) => {
  return (
    <div className="bg-[#2B170A] py-8 p-2 md:p-4">
      <div className="max-w-6xl m-auto">
        <div className="flex">
          <DualHeading className="text-white">Favourite *Holiday Destinations*</DualHeading>
          <Button className="ms-auto">Advertise with Us</Button>
        </div>
        <div id="slider" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="mt-8">
            {data.map((item, index) => (
              <label
                key={index}
                className={`slider-item ${getClassNames(index)} ${
                  activeIndex === index && isHovered ? 'transparent' : ''
                }`}
                id={`slider${index + 1}`}
              >
                <img src={item.image} alt={`image${index + 1}`} />
                <h1 className="text-sm">{item.title}</h1>
                {activeIndex === index && isHovered && <span className="click-here-text">Click here</span>}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayDestinationScreen;
