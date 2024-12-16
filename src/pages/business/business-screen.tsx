import { useEffect, useState } from 'react';

import Footer from '@molecules/footer';
import { BusinessHeader } from '@molecules/header';
import DualHeading from '@atoms/heading/dual-heading';
import ColsGrid from '@molecules/layout/cols-grid';
import OverLayCard from '@atoms/card/overlay-card';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Button from '@atoms/custom-button/button';
import useScreenWidth from '@hooks/useScreenWidth';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase, toKebabCase } from '@utils/common';

const BusinessScreen = ({ props }) => {
  const {
    navigate,
    country,
    landingData,
    landingError,
    landingLoading,
    weatherData,
    weatherLoading,
    weatherError,
    agencyData,
    agencyLoading,
    agencyError,
    investmentData,
    investmentError,
    investmentLoading,
    naturalResourcesData,
    naturalResourcesLoading,
    naturalResourcesError,
    eventsData,
    eventsLoading,
    eventsError,
    professionalServicesData,
    professionalServicesLoading,
    professionalServicesError,
  } = props;
  const [layout, setLayout] = useState(3);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 1024) {
      setLayout(2);
    } else {
      setLayout(3);
    }
  }, [screenWidth]);

  if (
    landingLoading ||
    investmentLoading ||
    weatherLoading ||
    naturalResourcesLoading ||
    professionalServicesLoading ||
    eventsLoading ||
    agencyLoading
  ) {
    return 'Loading';
  }
  if (
    landingError ||
    investmentError ||
    weatherError ||
    naturalResourcesError ||
    eventsError ||
    professionalServicesError ||
    agencyError
  ) {
    return 'Error Loading page..';
  }

  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="bg-orange-500 p-4 text-white text-xl text-center">
        <p>Getting there - Book Flight and accommodation</p>
      </div>
      <BusinessHeader country={fromKebabCase(country)} />
      {/* Hero section */}
      <div className="m-auto max-w-6xl p-4">
        <div className="relative">
          <div
            className="aspect-video bg-cover rounded-md w-full brightness-50"
            style={{
              backgroundImage: `url(${sanityImageUrlBuilder(landingData.businessLanding)})`,
            }}
          ></div>
          <div className="text-white text-sm md:text-base lg:text-lg flex flex-col gap-2 lg:gap-6 p-2 md:p-4 lg:p-8 absolute bottom-0 brightness-200">
            <p>
              Weather:{' '}
              {weatherLoading
                ? 'Loading...'
                : weatherData
                  ? `${weatherData.temperature} °F / ${weatherData.condition}`
                  : 'No data available'}
            </p>
            <p>Internet speed: {landingData.internetSpeed}</p>
            <p>Time: {weatherData ? weatherData.time : 'Loading...'}</p>
          </div>
        </div>
      </div>

      {/* Key Investment Sectors */}
      <div className="max-w-6xl m-auto p-4">
        <DualHeading>{`Key *Investment Sectors* in ${landingData.country}`}</DualHeading>
        <p className="mb-4 text-sm">
          Including endless opportunities for small and medium enterprises (SMEs) across all sectors
        </p>
        <ColsGrid cols={layout}>
          {investmentData.map((item) => (
            <OverLayCard data={item} key={item._id} />
          ))}
        </ColsGrid>
      </div>

      {/* Investment Agency container */}
      <div className="w-full bg-black text-white">
        <div className="max-w-6xl m-auto p-2 md:p-4 py-8">
          <h2 className="text-lg md:text-4xl">
            For more information on <span className="text-orange-500">Investment</span> in {fromKebabCase(country)}
          </h2>
          <div className="flex flex-col md:flex-row gap-2 mt-3">
            <img
              className="md:w-1/4 aspect-square h-auto rounded-md"
              src={sanityImageUrlBuilder(agencyData.agencyLogo)}
            />
            <div className="flex-grow space-y-2">
              <h1 className="font-semibold">{agencyData.agencyName}</h1>
              <h3 className="font-semibold">Website: {agencyData.agencyWebsite}</h3>
              <div className="border border-white rounded-md p-2 text-sm">
                <p className="font-semibold">Reviews:</p>
                <ul>
                  {agencyData.agencyReviews.map((each: string, index: number) => (
                    <li key={index}>{each}</li>
                  ))}
                </ul>
              </div>
              <p className="text-right">
                For more information: <Button>Contact</Button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Natural Resources */}
      <div className="max-w-6xl m-auto p-4">
        <DualHeading>Natural *Resources*</DualHeading>
        <p className="text-sm">
          Committing to local beneficiation & enhancing the value addition of the continent's abundant resources
        </p>
        <CommonCarousel data={naturalResourcesData} component={(item) => <OverLayCard data={item} />} />
      </div>

      {/* Upcoming events */}
      <div className="max-w-6xl m-auto p-4">
        <DualHeading className="mb-4">Upcoming *Events*</DualHeading>
        <ColsGrid cols={layout}>
          {eventsData.map((item) => (
            <OverLayCard
              data={{
                ...item,
                onClick: () => navigate(`/${country}/business/event/${toKebabCase(item.title)}`),
              }}
              key={item._id}
            />
          ))}
        </ColsGrid>
      </div>

      {/* Professional Services */}
      <div className="max-w-6xl m-auto p-4">
        <div className="flex">
          <DualHeading>Professional *Services*</DualHeading>
          <Button className="ms-auto">Advertise your business</Button>
        </div>
        <CommonCarousel data={professionalServicesData} component={(item) => <OverLayCard data={item} />} />
      </div>
      <Footer />
    </div>
  );
};

export default BusinessScreen;
