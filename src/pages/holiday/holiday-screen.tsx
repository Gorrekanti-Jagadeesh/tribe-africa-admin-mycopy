import Footer from '../../molecules/footer';
import { HolidayHeader } from '../../molecules/header';
import MapChart from '../../molecules/maps/map';
import DualHeading from '@atoms/heading/dual-heading';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import OverLayCard from '@atoms/card/overlay-card';
import { sanityImageUrlBuilder } from '@api/index';
import ColsGrid from '@molecules/layout/cols-grid';
import { fromKebabCase } from '@utils/common';
import { CountriesGeoData } from '@data/index';

const HolidayScreen = ({ props }) => {
  const {
    country,
    weatherData,
    weatherLoading,
    weatherError,
    landingData,
    landingError,
    landingLoading,
    lookOutForData,
    lookOutForLoading,
    lookOutForError,
    mapsData,
    mapsError,
    mapsLoading,
    adventuresData,
    adventuresLoading,
    adventuresError,
    tribeGoesOutData,
    tribeGoesOutLoading,
    tribeGoesOutError,
  } = props;

  if (!country || !CountriesGeoData[country]) {
    return <div>Country data not available</div>;
  }

  if (
    landingLoading ||
    weatherLoading ||
    lookOutForLoading ||
    mapsLoading ||
    adventuresLoading ||
    tribeGoesOutLoading
  ) {
    return 'Loading';
  }
  if (
    landingError ||
    !landingData ||
    weatherError ||
    !weatherData ||
    lookOutForError ||
    !lookOutForData ||
    mapsError ||
    !mapsData ||
    adventuresError ||
    !adventuresData ||
    tribeGoesOutError ||
    !tribeGoesOutData
  ) {
    return 'Error Loading page..';
  }

  return (
    <div>
      <HolidayHeader country={fromKebabCase(country)} />
      <div>
        {/* Adventure */}
        <div className="max-w-6xl m-auto p-4">
          {/* Hero section */}
          <div className="">
            <div className="relative">
              <div
                className="aspect-video bg-cover rounded-md w-full brightness-50"
                style={{
                  backgroundImage: `url(${sanityImageUrlBuilder(landingData.holidayLanding)})`,
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
          <DualHeading className="mb-4">Let the *Adventure* begin</DualHeading>
          <CommonCarousel
            data={adventuresData}
            component={(item) => <OverLayCard data={{ ...item, title: 'Excursions Coming Soon' }} />}
          />
        </div>

        {/* Things to look out for */}
        <div className="max-w-6xl m-auto p-4 animate-on-scroll">
          <DualHeading>Things to *Look Out* For!</DualHeading>
          <div className="mt-4">
            <ColsGrid cols={3} gap={3}>
              {lookOutForData.map((each) => (
                <OverLayCard data={each} key={each._id} />
              ))}
            </ColsGrid>
          </div>
        </div>

        {/* Map */}
        <MapChart country={country} data={mapsData} />

        {/* When the tribe goes out */}
        <div className="max-w-6xl m-auto p-4">
          <DualHeading className="mb-4">When the *Tribe* goes out!</DualHeading>
          <CommonCarousel data={tribeGoesOutData} component={(item) => <OverLayCard data={item} />} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HolidayScreen;
