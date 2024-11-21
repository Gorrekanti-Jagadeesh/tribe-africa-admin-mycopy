import React, { useState, useEffect } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import Button from '@atoms/custom-button/button';
import { HolidayDestinationData as destinations } from '@data/index';

const HolidayDestination: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getClassNames = (index: number) => {
    if (index === activeIndex) return 'active-slide';
    if (index === (activeIndex + 1) % destinations.length) return 'right-slide';
    if (index === (activeIndex + 2) % destinations.length) return 'far-right-slide';
    if (index === (activeIndex - 1 + destinations.length) % destinations.length) return 'left-slide';
    if (index === (activeIndex - 2 + destinations.length) % destinations.length) return 'far-left-slide';
    return 'hidden-slide';
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleRightClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const handleLeftClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };

  return (
    <div className="bg-[#2B170A] py-8 p-2 md:p-4">
      <div className="max-w-6xl m-auto">
        <div className="flex">
          <DualHeading className="text-white">Favourite *Holiday Destinations*</DualHeading>
          <Button className="ms-auto">Advertise with Us</Button>
        </div>
        <div
          id="slider"
          className="relative w-1/2 h-80 m-auto my-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            {destinations.map((item, index) => (
              <label
                key={index}
                onClick={() => console.log(item.title)}
                className={`absolute top-0 left-0 w-full h-full max-h-72 rounded-lg transition-transform duration-600 ease-in ${getClassNames(index)} ${
                  activeIndex === index && isHovered ? 'transparent' : ''
                }`}
                id={`slider${index + 1}`}
              >
                <img
                  src={item.image}
                  className="w-full h-full rounded-md object-cover cursor-pointer hover:border border-orange-500"
                  alt={`Image of ${item.title}`}
                />
                <h1 className="text-sm absolute bottom-0 left-0 m-2">{item.title}</h1>
              </label>
            ))}
          </div>
          <div className="absolute -bottom-4 flex text-white gap-2 w-full justify-center items-center">
            <button onClick={handleLeftClick}>&larr;</button>
            {destinations.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 aspect-square rounded-full ${activeIndex === idx ? 'bg-blue-500' : 'bg-white'}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <button onClick={handleRightClick}>&rarr;</button>
          </div>
        </div>
      </div>
      <style>
        {`
          .active-slide {
            transform: translateX(0) scale(1);
            z-index: 5;
            opacity: 1;
          }

          .right-slide {
            transform: translateX(20%) scale(0.8);
            z-index: 4;
          }

          .far-right-slide {
            transform: translateX(40%) scale(0.6);
            z-index: 3;
          }

          .left-slide {
            transform: translateX(-20%) scale(0.8);
            z-index: 4;
          }

          .far-left-slide {
            transform: translateX(-40%) scale(0.6);
            z-index: 3;
          }

          .hidden-slide {
            transform: translateX(0);
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
};

export default HolidayDestination;
