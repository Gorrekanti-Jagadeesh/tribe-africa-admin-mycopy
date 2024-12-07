import React, { useEffect, useState } from 'react';
import spiralBackground from '@assets/branding-bg-dark.png';
import { TribeAfrica } from '@atoms/common/internal-logo';
import sanityClient from '../../../sanityClient';
import HeroSection from './hero-section';
import { sanityImageUrlBuilder } from '@api/index';

// import { useTranslation } from 'react-i18next';

interface landingDataFields {
  video: string;
  image: []; // Array of Sanity image objects
  exploreSectionImages: string;
  welcomeMessage: string;
  aboutAfricaPart1: string;
  aboutAfricaPart2: string;
  aboutAfricaPart3: string;
}
const Explore: React.FC = () => {
  const [landingData, setLandingData] = useState<landingDataFields[]>([]);
  // const { t } = useTranslation();
  // Fetch hotels from Sanity
  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await sanityClient.fetch(`
            *[_type == "home-landing-page"]
          `);
        setLandingData(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    }
    fetchHotels();
  }, []);

  return (
    <>
      {landingData.length > 0 && (
        <HeroSection video={landingData[0]?.video} image={sanityImageUrlBuilder(landingData[0]?.image).url()} />
      )}
      <div
        className="relative bg-cover bg-center text-white p-2 md:p-4"
        style={{ backgroundImage: `url(${spiralBackground})` }}
      >
        <span className="m-auto my-4 max-w-6xl grid md:flex gap-4 md:gap-8 lg:gap-28">
          <div id="welcome-content" className="grid gap-8 animate-on-scroll">
            <h4 className="text-4xl">
              Explore Africa For <br />
              <span className="text-6xl">
                <span className="font-serif text-orange-500">Business</span> & Tourism
              </span>
            </h4>
            {/* Use below if Static data translaiton with i18 is required */}
            {/* <div id="about-africa" className="grid gap-2 text-sm">
            <p>{t('welcomeMessage')}</p>
            <p>
              <br />
            </p>
            <p>{t('aboutAfricaPart1')}</p>
            <p>
              <br />
            </p>
            <p>{t('aboutAfricaPart2')}</p>
            <p>
              <br />
            </p>
            <p>{t('aboutAfricaPart3')}</p>
          </div> */}

            <div id="about-africa" className="grid gap-2 text-sm">
              {landingData.length > 0 && (
                <>
                  <p>{landingData[0].welcomeMessage}</p>
                  <p>
                    <br />
                  </p>
                  <p>{landingData[0].aboutAfricaPart1}</p>
                  <p>
                    <br />
                  </p>
                  <p>{landingData[0].aboutAfricaPart2}</p>
                  <p>
                    <br />
                  </p>
                  <p>{landingData[0].aboutAfricaPart3}</p>
                </>
              )}
            </div>
            <div id="welcome-footer" className="text-sm flex gap-2">
              <span className="flex flex-wrap">
                join <TribeAfrica className="mx-1.5" /> and be a part of the future. welcome to the tribe.
              </span>
            </div>
          </div>{' '}
          {landingData.length > 0 && (
            <div className="flex gap-3 md:flex-col m-auto md:max-w-96 animate-on-scroll">
              <div className="flex gap-3 w-2/3 md:w-full">
                {/* Top Left Image */}
                <div className="w-1/2 h-full aspect-square md:aspect-auto">
                  <img
                    src={sanityImageUrlBuilder(landingData[0]?.exploreSectionImages[0]).url()}
                    alt="Person in suit"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Top Right Image */}
                <div className="w-1/2 h-full aspect-square md:aspect-auto">
                  <img
                    src={sanityImageUrlBuilder(landingData[0]?.exploreSectionImages[1]).url()}
                    alt="Person in suit"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Bottom Full-Width Image */}
              <div className="w-1/3 md:w-full">
                <img
                  src={sanityImageUrlBuilder(landingData[0]?.exploreSectionImages[2]).url()}
                  alt="Person on boat"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </span>
      </div>
    </>
  );
};

export default Explore;
