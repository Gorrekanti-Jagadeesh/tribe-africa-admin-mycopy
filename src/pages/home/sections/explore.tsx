import React from 'react';
import spiralBackground from '@assets/branding-bg-dark.png';
import welcomeImage1 from '@assets/homepage-welcome-image.png';
import welcomeImage2 from '@assets/homepage-welcome-image-2.png';
import welcomeImage3 from '@assets/homepage-welcome-image-3.png';
import { TribeAfrica } from '@atoms/common/internal-logo';

import { useTranslation } from 'react-i18next';

const Explore: React.FC = () => {
  const { t } = useTranslation();
  return (
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
          <div id="about-africa" className="grid gap-2 text-sm">
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
          </div>
          <div id="welcome-footer" className="text-sm flex gap-2">
            <span>
              join <TribeAfrica />
            </span>
            <span>and be a part of the future. welcome to the tribe.</span>
          </div>
        </div>
        <div className="flex gap-3 md:flex-col m-auto md:max-w-96 animate-on-scroll">
          <div className="flex gap-3 w-2/3 md:w-full">
            {/* Top Left Image */}
            <div className="w-1/2 h-full aspect-square md:aspect-auto">
              <img
                src={welcomeImage1}
                alt="Person in suit"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Top Right Image */}
            <div className="w-1/2 h-full aspect-square md:aspect-auto">
              <img
                src={welcomeImage2}
                alt="Person in suit"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Full-Width Image */}
          <div className="w-1/3 md:w-full">
            <img src={welcomeImage3} alt="Person on boat" className="w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </span>
    </div>
  );
};

export default Explore;
