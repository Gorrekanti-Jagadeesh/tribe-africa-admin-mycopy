import React, { useState, useEffect } from 'react';
import DualHeading from '../../../atoms/heading/dual-heading';
import Button from '../../../atoms/custom-button/button';
import { HolidayDestinationData as destinations } from '../../../data';

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

  // const handleRightClick = () => {
  //   setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  // };

  // const handleLeftClick = () => {
  //   setActiveIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  // };

  return (
    <div className="bg-[#2B170A] py-8 p-2 md:p-4">
      <div className="max-w-6xl m-auto">
        <div className="flex">
          <DualHeading className="text-white">Favourite *Holiday Destinations*</DualHeading>
          <Button className="ms-auto">Advertise with Us</Button>
        </div>
        <div
          id="slider"
          className="slider-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="mt-8">
            {destinations.map((item, index) => (
              <label
                key={index}
                className={`slider-item ${getClassNames(index)} ${
                  activeIndex === index && isHovered ? 'transparent' : ''
                }`}
                id={`slider${index + 1}`}
              >
                <img src={item.image} alt={`Image of ${item.title}`} />
                <h1 className="text-sm">{item.title}</h1>
                {activeIndex === index && isHovered && <span className="click-here-text">Click here</span>}
              </label>
            ))}
          </div>
          <div className="indicators">
            {destinations.map((_, idx) => (
              <span
                key={idx}
                className={`indicator ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          .slider-container {
            position: relative;
            width: 50%;
            height: 20rem;
            margin: 20px auto;
            perspective: 1400px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .slider-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            transition: transform 600ms ease, opacity 600ms ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .slider-item img {
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            object-fit: cover;
          }

          .slider-item h1 {
            position: absolute;
            bottom: 20px;
            left: 8%;
            transform: translateX(-50%);
            color: white;
            font-size: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            z-index: 2;
          }

          @media screen and (max-width: 767px) {
            .slider-item h1 {
              bottom: 10px;
              left: 15%;
              font-size: 1.3rem;
            }
          }

          .transparent img {
            opacity: 0.95;
            transition: opacity 0.3s ease;
          }

          .click-here-text {
            position: absolute;
            color: #000;
            font-size: 1.5rem;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            bottom: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
            opacity: 0.5;
            z-index: 3;
            pointer-events: none;
          }

          .active-slide {
            transform: translateX(0) scale(1);
            z-index: 5;
            opacity: 1;
          }

          .right-slide {
            transform: translateX(20%) scale(0.8);
            z-index: 4;
            opacity: 0.6;
          }

          .far-right-slide {
            transform: translateX(40%) scale(0.6);
            z-index: 3;
            opacity: 0.4;
          }

          .left-slide {
            transform: translateX(-20%) scale(0.8);
            z-index: 4;
            opacity: 0.6;
          }

          .far-left-slide {
            transform: translateX(-40%) scale(0.6);
            z-index: 3;
            opacity: 0.4;
          }

          .hidden-slide {
            transform: translateX(-100%);
            opacity: 0;
          }

          .indicators {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: lightgray;
            margin: 0 5px;
            cursor: pointer;
            transition: background 300ms ease;
          }

          @media screen and (max-width: 768px) {
            .indicator {
              width: 8px;
              height: 8px;
            }
          }

          .indicator.active {
            background: #007bff;
          }
        `}
      </style>
    </div>
  );
};

export default HolidayDestination;
