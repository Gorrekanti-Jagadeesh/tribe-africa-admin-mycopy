import React from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import './holiday-destination-styles.css';
import CustomeSectionHeadingComponent from '../../../atoms/custom-section-heading/custom-section-heading-component';

interface holidayDestinationCarouselData {
  images: string[];
  titles: string[];
  activeIndex: number;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  getClassNames: (index: number) => string;
  handleDotClick: (index: number) => void;
  handleRightClick: () => void;
  handleLeftClick: () => void;
}

const HolidayDestinationScreen: React.FC<holidayDestinationCarouselData> = ({
  images,
  titles,
  activeIndex,
  isHovered,
  setIsHovered,
  getClassNames,
  handleDotClick,
  handleLeftClick,
  handleRightClick,
}) => {
  return (
    <div className="container bg-[#2B170A] mx-auto py-8">
      <CustomeSectionHeadingComponent
        title="Favourite"
        subPartTitle="Holiday Destination"
        buttonTitle="Advertise with Us"
        titleStyles="font-[Poppins] text-[#fff]"
        subTitleStyles="text-[#FF6600] font-[Rufina]"
      />
      <div id="slider" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="mt-8">
          {images.map((img, index) => (
            <label
              key={index}
              className={`slider-item ${getClassNames(index)} ${
                activeIndex === index && isHovered ? 'transparent' : ''
              }`}
              id={`slider${index + 1}`}
            >
              <img src={img} alt={`image${index + 1}`} />
              <h1 className="text-sm">{titles[index]}</h1>
              {activeIndex === index && isHovered && <span className="click-here-text">Click here</span>}
            </label>
          ))}
        </div>
        {/* Indicators */}
      </div>
      <div className="indicators">
        <FaArrowLeftLong className="mr-5 cursor-pointer" onClick={handleLeftClick} color="#fff" />
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
        <FaArrowRightLong className="ml-5 cursor-pointer" onClick={() => handleRightClick()} color="#fff" />
      </div>
    </div>
  );
};

export default HolidayDestinationScreen;
