import Footer from '../../molecules/footer';
import { HolidayHeader } from '../../molecules/header';
import MapChart from '../../molecules/maps/map';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import OverLayCard from '@atoms/card/overlay-card';
import { sanityImageUrlBuilder } from '@api/index';
import ColsGrid from '@molecules/layout/cols-grid';
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
    return <div className="p-8 font-poppins text-xl">Country data not available</div>;
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
      <HolidayHeader country={country} />
      <div>
        {/* Hero section — Figma: 1303×651 radius=10, dark overlay div, stats 24px Poppins 600 */}
        <div className="max-w-8xl m-auto px-4 py-4">
          <div className="relative rounded-[10px] overflow-hidden" style={{ aspectRatio: '1303/651' }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${sanityImageUrlBuilder(landingData.holidayLanding)})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 flex flex-col gap-3 text-white">
              <p className="font-poppins font-semibold text-2xl">
                Weather:{' '}
                {weatherLoading
                  ? 'Loading...'
                  : weatherData
                    ? `${weatherData.temperature} °F / ${weatherData.condition}`
                    : 'No data available'}
              </p>
              <p className="font-poppins font-semibold text-2xl">Internet speed: {landingData.internetSpeed}</p>
              <p className="font-poppins font-semibold text-2xl">
                Time: {weatherData ? weatherData.time : 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        {/* Let the Adventure Begin — Figma: 48px Poppins 400 black */}
        <div className="max-w-8xl m-auto px-4 py-4">
          <h2 className="font-poppins font-normal text-3xl md:text-4xl lg:text-[48px] lg:leading-[72px] text-black mb-6">
            Let the Adventure Begin
          </h2>
          {/* Adventure carousel — Figma: 421×400 cards, radius=10 */}
          <CommonCarousel
            data={adventuresData}
            component={(item) => <OverLayCard data={{ ...item, title: 'Excursions Coming Soon' }} />}
          />
        </div>

        {/* Things to Look Out For — Figma: 50px Poppins 400 */}
        <div className="max-w-8xl m-auto px-4 py-8 animate-on-scroll">
          <h2 className="font-poppins font-normal text-3xl md:text-4xl lg:text-[50px] text-black mb-6">
            Things To Look Out For!
          </h2>
          <ColsGrid cols={3} gap={3}>
            {lookOutForData.map((each) => (
              <OverLayCard data={each} key={each._id} />
            ))}
          </ColsGrid>
        </div>

        {/* Map */}
        <MapChart country={country} data={mapsData} />

        {/* When the tribe goes out */}
        <div className="max-w-8xl m-auto px-4 py-8">
          <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black mb-6">
            When the <span className="text-brand-orange">Tribe</span> goes out!
          </h2>
          <CommonCarousel data={tribeGoesOutData} component={(item) => <OverLayCard data={item} />} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HolidayScreen;
