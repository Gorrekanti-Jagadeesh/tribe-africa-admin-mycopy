import React, { useState, useEffect } from 'react';
import Button from '@atoms/custom-button/button';
import Modal from '@molecules/modal';
import { sanityImageUrlBuilder } from '@api/index';
import ColsGrid from '@molecules/layout/cols-grid';
import { Loading } from '@atoms/common/loading';
import useScreenWidth from '@hooks/useScreenWidth';
import { Link } from 'react-router-dom';
import AdvertisementForm from '@/molecules/forms/advertisement-form';

interface Destination {
  image: string;
  country: string;
  destinationName: string;
}

const HolidayDestination: React.FC<{ data: Destination[]; loading; error }> = ({ data, loading, error }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [layout, setLayout] = useState(3);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 1024) setLayout(2);
    else setLayout(3);
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

  if (!data || loading) return <Loading />;
  if (error) return <>Error fetching data..</>;

  return (
    /* Figma: bg=#2B170A, full-width */
    <div className="bg-[#2B170A] py-10 px-4">
      <div className="max-w-8xl m-auto">
        {/* Heading row — Figma: "Favourite Holiday Destinations" 64px Rufina white + "Advertise with us" orange CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-white">
            Favourite <span className="text-brand-orange">Holiday Destinations</span>
          </h2>
          <Button
            className="shrink-0 text-lg md:text-2xl px-8 md:px-10 py-3 md:py-4"
            onClick={() => setIsAddOpen(true)}
          >
            Advertise with Us
          </Button>
        </div>

        {/* Carousel — Figma: slides radius=40, 480×240 / 640×320 / 800×400 */}
        <div
          id="slider"
          className="relative w-4/5 md:w-3/5 h-fit m-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full aspect-video">
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              customClasses="w-full h-full p-2 md:p-6 bg-[#2B170A] text-white rounded-[10px] border-2 border-brand-orange"
            >
              <ColsGrid cols={layout}>
                {data[country] ? (
                  data[country].map((item, idx) => (
                    <div key={idx} className="p-2">
                      <img
                        src={sanityImageUrlBuilder(item.image).url()}
                        alt={item.destinationName}
                        className="w-full aspect-square object-cover rounded-[10px]"
                      />
                      <p className="text-sm mt-2 font-poppins">{item.destinationName}</p>
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
            </Modal>

            {Object.keys(data).map((country, index) => (
              <label
                key={country}
                onClick={() => handlePopup(country)}
                className={`absolute top-0 left-0 w-full aspect-video max-h-72 transition-transform duration-600 ease-in ${getClassNames(index)}`}
                id={`slider${index + 1}`}
              >
                {/* Figma carousel slides: radius=40 */}
                <img
                  src={sanityImageUrlBuilder(data[country][0]?.image).url() || ''}
                  className="w-full h-full rounded-[40px] object-cover cursor-pointer hover:ring-2 hover:ring-brand-orange"
                  alt={country}
                />
                {/* Figma: "Algeria" 32px Poppins w800 white, bottom-left of active slide */}
                <Link
                  to={`/${country.toLowerCase().split(' ').join('-')}/holiday`}
                  className="text-white font-poppins font-extrabold text-[32px] leading-[48px] absolute bottom-4 left-4 drop-shadow-lg"
                >
                  {country}
                </Link>
              </label>
            ))}
          </div>

          {/* Slider navigation — Figma: arrow + dot indicators */}
          <div className="absolute flex text-white gap-3 w-full justify-center items-center mt-2">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + Object.keys(data).length) % Object.keys(data).length)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
            >
              &#8592;
            </button>
            {Object.keys(data).map((_, idx) => (
              <span
                key={idx}
                className={`rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-4 h-4 bg-[#7B61FF]' : 'w-3 h-3 bg-[#999999]'
                }`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % Object.keys(data).length)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isAddOpen} setIsOpen={setIsAddOpen} containerClasses="ms-auto">
        <AdvertisementForm />
      </Modal>

      <style>{`
        .active-slide { transform: translateX(0) scale(1); z-index: 3; opacity: 1; }
        .right-slide { transform: translateX(20%) scale(0.8); z-index: 2; }
        .far-right-slide { transform: translateX(40%) scale(0.6); z-index: 1; }
        .left-slide { transform: translateX(-20%) scale(0.8); z-index: 2; }
        .far-left-slide { transform: translateX(-40%) scale(0.6); z-index: 1; }
        .hidden-slide { transform: translateX(0); opacity: 0; }
      `}</style>
    </div>
  );
};

export default HolidayDestination;
