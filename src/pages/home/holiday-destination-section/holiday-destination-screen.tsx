import React from 'react';
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
}) => {
  return (
    <div className="bg-[#2B170A] py-8 p-2 md:p-4">
      <div className="max-w-6xl m-auto">
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
        </div>
      </div>
    </div>
  );
};

export default HolidayDestinationScreen;
