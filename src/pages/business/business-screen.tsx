import { useEffect, useState } from 'react';

import Footer from '@molecules/footer';
import { BusinessHeader } from '@molecules/header';
import DualHeading from '@atoms/heading/dual-heading';
import ColsGrid from '@molecules/layout/cols-grid';
import OverLayCard from '@atoms/card/overlay-card';
import CommonCarousel from '@molecules/carousel/common-carousel';
import Button from '@atoms/custom-button/button';

import useScreenWidth from '@hooks/useScreenWidth';

import heroBackground from '@assets/homepage-welcome-image-2.png';
import { upcomingEvents, countryInternetData } from '@data/index';

const BusinessScreen = ({
  country,
  weatherData,
  isLoading,
}: {
  country: string | undefined;
  weatherData: { temperature: number; condition: string; time: string } | undefined;
  isLoading: boolean;
}) => {
  const [layout, setLayout] = useState(3);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 1024) {
      setLayout(2);
    } else {
      setLayout(3);
    }
  }, [screenWidth]);

  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="bg-orange-500 p-4 text-white text-xl text-center">
        <p>Getting there - Book Flight and accommodation</p>
      </div>
      <BusinessHeader country={country} />
      {/* Hero section */}
      <div className="m-auto max-w-6xl p-4">
        <div className="relative">
          <div
            className="aspect-video bg-cover rounded-md w-full brightness-50"
            style={{
              backgroundImage: `url(${heroBackground})`,
            }}
          ></div>
          <div className="text-white text-sm md:text-base lg:text-lg flex flex-col gap-2 lg:gap-6 p-2 md:p-4 lg:p-8 absolute bottom-0 brightness-200">
            <p>
              Weather:{' '}
              {isLoading
                ? 'Loading...'
                : weatherData
                  ? `${weatherData.temperature} °F / ${weatherData.condition}`
                  : 'No data available'}
            </p>
            <p>Internet speed: {countryInternetData[country].speed}</p>
            <p>Time: {weatherData ? weatherData.time : 'Loading...'}</p>
          </div>
        </div>
      </div>

      {/* Cards layout for 'Key Investment Sectors' */}
      <div className="max-w-6xl m-auto p-4">
        <DualHeading>{`Key *Investment Sectors* in ${country}`}</DualHeading>
        <p className="mb-4">
          Including endless opportunities for small and medium enterprises (SMEs) across all sectors
        </p>
        <ColsGrid cols={layout}>
          {upcomingEvents.map((item) => (
            <OverLayCard data={item} />
          ))}
        </ColsGrid>
      </div>

      {/* Natural Resources */}
      <div className="max-w-6xl m-auto p-4">
        <DualHeading>Natural *Resources*</DualHeading>
        <p className="">
          Committing to local beneficiation & enhancing the value addition of the continent's abundant resources
        </p>
        <CommonCarousel
          data={[
            {
              title: 'title1',
              image: heroBackground,
            },
            {
              title: 'title1',
              image: heroBackground,
            },
            {
              title: 'title1',
              image: heroBackground,
            },
          ]}
        />
      </div>

      {/* Upcoming events */}
      <div className="max-w-6xl m-auto p-4">
        <DualHeading className="mb-4">Upcoming *Events*</DualHeading>
        <ColsGrid cols={layout}>
          {upcomingEvents.map((item) => (
            <OverLayCard data={item} />
          ))}
        </ColsGrid>
      </div>

      {/* Professional Services */}
      <div className="max-w-6xl m-auto p-4">
        <div className="flex">
          <DualHeading>Professional *Services*</DualHeading>
          <Button className="ms-auto">Advertise your business</Button>
        </div>
        <CommonCarousel
          data={[
            {
              title: 'title1',
              image: heroBackground,
            },
          ]}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BusinessScreen;
