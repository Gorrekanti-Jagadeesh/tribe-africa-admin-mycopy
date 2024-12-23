import React, { useState, useEffect } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import Button from '@atoms/custom-button/button';
import Modal from '@molecules/modal';
import { sanityImageUrlBuilder } from '@api/index';
import ColsGrid from '@molecules/layout/cols-grid';
import { Loading } from '@atoms/common/loading';
import useScreenWidth from '@hooks/useScreenWidth';
import { Link } from 'react-router-dom';

interface Destination {
  image: string;
  country: string;
  destinationName: string;
}

const HolidayDestination: React.FC<{ data: Destination[]; loading; error }> = ({ data, loading, error }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [layout, setLayout] = useState(3);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 1024) {
      setLayout(2);
    } else {
      setLayout(3);
    }
  }, [screenWidth]);

  const handlePopup = (country: string) => {
    if (data[country]) {
      setCountry(country);
      setIsOpen(true);
      setIsHovered(false);
    }
  };

  const getClassNames = (index: number) => {
    const total = Object.keys(data).length;
    if (index === activeIndex) return 'active-slide';
    if (index === (activeIndex + 1) % total) return 'right-slide';
    if (index === (activeIndex - 1 + total) % total) return 'left-slide';
    if (index === (activeIndex + 2) % total) return 'far-right-slide';
    if (index === (activeIndex - 2 + total) % total) return 'far-left-slide';

    return 'hidden-slide';
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % Object.keys(data).length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isHovered, data]);

  if (!data || loading) {
    return <Loading />;
  }

  if (error) {
    return <>Error fetching data..</>;
  }

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
          {/* Images */}
          <div className="relative w-full aspect-video">
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              customClasses="w-full h-full p-2 md:p-6 md:p-8 bg-[#2B170A] text-white rounded-md border-2 border-orange-500"
            >
              <ColsGrid cols={layout}>
                {data[country] ? (
                  data[country].map((item, idx) => (
                    <div key={idx} className="p-2">
                      <img
                        src={sanityImageUrlBuilder(item.image).url()}
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

              <div className="w-full flex mb-4">
                <Button className="ms-auto">
                  <Link to={`/${country.toLowerCase().split(' ').join('-')}/holiday`}>Know more</Link>
                </Button>
              </div>
              {/* </div> */}
            </Modal>

            {Object.keys(data).map((country, index) => (
              <label
                key={country}
                onClick={() => handlePopup(country)}
                className={`absolute top-0 left-0 w-full aspect-video max-h-72 rounded-lg transition-transform duration-600 ease-in ${getClassNames(index)}`}
                id={`slider${index + 1}`}
              >
                <img
                  src={sanityImageUrlBuilder(data[country][0]?.image).url() || ''}
                  className="w-full h-full rounded-3xl object-cover cursor-pointer hover:border border-orange-500"
                  alt={country}
                />
                <Link
                  to={`/${country.toLowerCase().split(' ').join('-')}/holiday`}
                  className="text-white absolute bottom-0 left-0 m-4"
                >
                  {country}
                </Link>
              </label>
            ))}
          </div>
          {/* Slider buttons */}
          <div className="absolute flex text-white gap-2 w-full justify-center items-center">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + Object.keys(data).length) % Object.keys(data).length)}
            >
              &larr;
            </button>
            {Object.keys(data).map((_, idx) => (
              <span
                key={idx}
                className={`w-3 aspect-square rounded-full ${activeIndex === idx ? 'bg-blue-500' : 'bg-white'}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <button onClick={() => setActiveIndex((prev) => (prev + 1) % Object.keys(data).length)}>&rarr;</button>
          </div>
        </div>
      </div>
      <style>
        {`
          .active-slide {
            transform: translateX(0) scale(1);
            z-index: 3;
            opacity: 1;
          }

          .right-slide {
            transform: translateX(20%) scale(0.8);
            z-index: 2;
          }

          .far-right-slide {
            transform: translateX(40%) scale(0.6);
            z-index: 1;
          }

          .left-slide {
            transform: translateX(-20%) scale(0.8);
            z-index: 2;
          }

          .far-left-slide {
            transform: translateX(-40%) scale(0.6);
            z-index: 1;
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
