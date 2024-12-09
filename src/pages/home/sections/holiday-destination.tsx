import React, { useState, useEffect } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import Button from '@atoms/custom-button/button';
import Modal from '@molecules/modal';
import sanityClient from '../../../sanityClient';
import { sanityImageUrlBuilder } from '@api/index';
import ColsGrid from '@molecules/layout/cols-grid';

interface Destination {
  image: string;
  country: string;
  destinationName: string;
}

const HolidayDestination: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [groupedDestinations, setGroupedDestinations] = useState<Record<string, Destination[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<Destination[]>([]);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "holiday-destinations"]
        `);

        // Group destinations by country
        const groupedData = data.reduce((acc: Record<string, Destination[]>, item: Destination) => {
          const imageUrl = sanityImageUrlBuilder(item.image);
          const destination = { ...item, image: imageUrl };
          acc[item.country] = acc[item.country] || [];
          acc[item.country].push(destination);
          return acc;
        }, {});
        setGroupedDestinations(groupedData);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    }

    fetchDestinations();
  }, []);

  const handlePopup = (country: string) => {
    if (groupedDestinations[country]) {
      setPopupContent(groupedDestinations[country]);
      setIsOpen(true);
    }
  };

  const getClassNames = (index: number) => {
    const total = Object.keys(groupedDestinations).length;
    if (index === activeIndex) return 'active-slide';
    if (index === (activeIndex + 1) % total) return 'right-slide';
    if (index === (activeIndex - 1 + total) % total) return 'left-slide';
    if (index === (activeIndex + 2) % total) return 'far-right-slide';
    if (index === (activeIndex - 2 + total) % total) return 'far-left-slide';

    return 'hidden-slide';
  };

  const handleRightClick = () => setActiveIndex((prev) => (prev + 1) % Object.keys(groupedDestinations).length);
  const handleLeftClick = () =>
    setActiveIndex(
      (prev) => (prev - 1 + Object.keys(groupedDestinations).length) % Object.keys(groupedDestinations).length
    );

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % Object.keys(groupedDestinations).length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const countries = Object.keys(groupedDestinations);

  return (
    <div className="bg-[#2B170A] py-8 p-2 md:p-4">
      <div className="max-w-6xl m-auto">
        <div className="flex">
          <DualHeading className="text-white">Favourite *Holiday Destinations*</DualHeading>
          <Button className="ms-auto">Advertise with Us</Button>
        </div>
        <div
          id="slider"
          className="relative w-2/3 md:w-1/2 h-fit m-auto my-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full aspect-video">
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              customClasses="w-full h-full bg-[#2B170A] text-white rounded-md border-2 border-orange-500"
            >
              <ColsGrid>
                {popupContent.length ? (
                  popupContent.map((item, idx) => (
                    <div key={idx} className="p-2">
                      <img
                        src={item.image}
                        alt={item.destinationName}
                        className="w-full aspect-square object-cover rounded-md" // Fixed height
                      />
                      <p className="text-sm mt-2">{item.destinationName}</p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-2 lg:col-span-3">No data found</p>
                )}
              </ColsGrid>
              {/* </div> */}
            </Modal>

            {countries.map((country, index) => (
              <label
                key={country}
                onClick={() => handlePopup(country)}
                className={`absolute top-0 left-0 w-full aspect-video max-h-72 rounded-lg transition-transform duration-600 ease-in ${getClassNames(index)}`}
                id={`slider${index + 1}`}
              >
                <img
                  src={groupedDestinations[country][0]?.image || ''}
                  className="w-full h-full rounded-md object-cover cursor-pointer hover:border border-orange-500"
                  alt={country}
                />
                <h1 className="text-white absolute bottom-0 left-0 m-2">{country}</h1>
              </label>
            ))}
          </div>
          <div className="absolute flex text-white gap-2 w-full justify-center items-center">
            <button onClick={handleLeftClick}>&larr;</button>
            {countries.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 aspect-square rounded-full ${activeIndex === idx ? 'bg-blue-500' : 'bg-white'}`}
                onClick={() => setActiveIndex(idx)}
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
