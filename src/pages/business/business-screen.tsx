import { useEffect, useState } from 'react';
import Footer from '@molecules/footer';
import { BusinessHeader } from '@molecules/header';
import ColsGrid from '@molecules/layout/cols-grid';
import OverLayCard from '@atoms/card/overlay-card';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Button from '@atoms/custom-button/button';
import useScreenWidth from '@hooks/useScreenWidth';
import { sanityImageUrlBuilder } from '@api/index';
import { fromKebabCase, toKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';
import Modal from '@molecules/modal';
import AdvertisementForm from '@molecules/forms/advertisement-form';

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

  const [isAdOpen, setIsAdOpen] = useState(false);
  const [layout, setLayout] = useState(3);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 1024) setLayout(2);
    else setLayout(3);
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
    return <Loading />;
  }

  if (
    landingError ||
    !landingData ||
    investmentError ||
    !investmentData ||
    weatherError ||
    !weatherData ||
    naturalResourcesError ||
    !naturalResourcesData ||
    eventsError ||
    !eventsData ||
    professionalServicesError ||
    !professionalServicesData ||
    agencyError ||
    !agencyData
  ) {
    return 'Error Loading page..';
  }

  return (
    <div className="max-w-screen-2xl m-auto">
      <Modal isOpen={isAdOpen} setIsOpen={setIsAdOpen} containerClasses="ms-auto">
        <AdvertisementForm />
      </Modal>
      {/* Top orange banner */}
      <div className="bg-brand-orange px-4 py-3 text-white font-poppins text-xl text-center">
        <p>Getting there - Book Flight and accommodation</p>
      </div>

      <BusinessHeader country={country} />

      {/* Hero section — Figma: 1310×655, dark overlay div (not CSS filter), stats 24px Poppins 600 */}
      <div className="max-w-8xl m-auto px-4 py-4">
        <div className="relative rounded-[10px] overflow-hidden" style={{ aspectRatio: '1310/655' }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sanityImageUrlBuilder(landingData.businessLanding)})` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Stats overlay — bottom-left */}
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
            <p className="font-poppins font-semibold text-2xl">Time: {weatherData ? weatherData.time : 'Loading...'}</p>
          </div>
        </div>
      </div>

      {/* Key Investment Sectors — Figma: 50px Poppins 400, 3×3 grid (not carousel) */}
      <div className="max-w-8xl m-auto px-4 py-4">
        <h2 className="font-poppins font-normal text-3xl md:text-4xl lg:text-[50px] text-black mb-2">
          key Investment Sectors in {landingData.country}
        </h2>
        <p className="font-poppins text-xl md:text-2xl text-black mb-6">
          Including endless opportunities for small and medium enterprises (SMEs) across all sectors
        </p>
        {/* Figma: 3×3 grid, each card 424×400 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {investmentData.map((item) => (
            <OverLayCard data={item} key={item._id} />
          ))}
        </div>
      </div>

      {/* Investment Agency — Figma: bg=#1E1D1D, agency name 40px Poppins 600 */}
      <div className="w-full" style={{ backgroundColor: '#1E1D1D' }}>
        <div className="max-w-8xl m-auto px-4 py-10">
          <h2 className="font-poppins font-normal text-3xl md:text-[50px] text-white mb-4">
            For more information on <span className="text-brand-orange">Investment</span> in {fromKebabCase(country)}
          </h2>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <img
              className="md:w-[288px] md:h-auto rounded-[9px] object-contain"
              src={sanityImageUrlBuilder(agencyData.agencyLogo).url()}
              alt={agencyData.agencyName}
            />
            <div className="flex-grow space-y-3">
              {/* Agency name — Figma: 40px Poppins 600 */}
              <h1 className="font-poppins font-semibold text-2xl md:text-[40px] md:leading-tight text-white">
                {agencyData.agencyName}
              </h1>
              <p className="font-poppins font-medium text-xl md:text-2xl text-white">
                Website: {agencyData.agencyWebsite}
              </p>
              {/* Reviews card — Figma: Rectangle 358 bg=#D9D9D9, text 24px Poppins 500 black */}
              <div className="rounded-[10px] p-4" style={{ backgroundColor: '#D9D9D9' }}>
                <p className="font-poppins font-semibold text-2xl text-black mb-2">Reviews</p>
                <ul className="space-y-1">
                  {agencyData.agencyReviews.map((each: string, index: number) => (
                    <li key={index} className="font-poppins font-medium text-2xl text-black">
                      {each}
                    </li>
                  ))}
                </ul>
              </div>
              {/* "For More information:" — Figma: 32px Poppins 500 white */}
              <div className="flex items-center justify-end gap-4">
                <span className="font-poppins font-medium text-[32px] leading-tight text-white">
                  For More information:
                </span>
                {/* Contact button — Figma: 310×58, bg=#FF6600, radius=10, 24px Poppins 600 */}
                <Button className="text-2xl font-semibold px-8 py-3 shrink-0">Contact AAPI</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Natural Resources */}
      <div className="max-w-8xl m-auto px-4 py-8">
        <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black mb-2">
          Natural <span className="text-brand-orange">Resources</span>
        </h2>
        <p className="font-poppins text-xl text-gray-600 mb-6">
          Committing to local beneficiation &amp; enhancing the value addition of the continent's abundant resources
        </p>
        <CommonCarousel data={naturalResourcesData} component={(item) => <OverLayCard data={item} />} />
      </div>

      {/* Upcoming Events */}
      <div className="max-w-8xl m-auto px-4 py-8">
        <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black mb-6">
          Upcoming <span className="text-brand-orange">Events</span>
        </h2>
        <ColsGrid cols={layout}>
          {eventsData.map((item) => (
            <OverLayCard
              data={{ ...item, onClick: () => navigate(`/${country}/events/business/${toKebabCase(item.title)}`) }}
              key={item._id}
            />
          ))}
        </ColsGrid>
      </div>

      {/* Professional Services */}
      <div className="max-w-8xl m-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black">
            Professional <span className="text-brand-orange">Services</span>
          </h2>
          <Button className="shrink-0 text-lg md:text-2xl px-8 md:px-10 py-3 md:py-4" onClick={() => setIsAdOpen(true)}>
            Advertise your business
          </Button>
        </div>
        <CommonCarousel data={professionalServicesData} component={(item) => <OverLayCard data={item} />} />
      </div>

      <Footer />
    </div>
  );
};

export default BusinessScreen;
