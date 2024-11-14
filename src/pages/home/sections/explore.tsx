import React from 'react';
import spiralBackground from '@assets/branding-bg-dark.png';
import welcomeImage1 from '@assets/homepage-welcome-image.png';
import welcomeImage2 from '@assets/homepage-welcome-image-2.png';
import welcomeImage3 from '@assets/homepage-welcome-image-3.png';
import { TribeAfrica } from '@atoms/common/internal-logo';

const Explore: React.FC = () => {
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
            <p>
              Welcome to Tribe Africa, your gateway to discovering the breathtaking beauty and boundless opportunities
              of the African continent.
            </p>
            <p>
              <br />
            </p>
            <p>
              Home to 54 countries, Africa is a land rich in talent, culture, and awe-inspiring natural wonders waiting
              to be explored. It's a hidden gem of potential brimming with opportunities for entrepreneurs, and offering
              great travel experiences for holidaymakers seeking a sense of wonder and amazement. At the heart of this
              vast continent is a dynamic, youthful population with an entrepreneurial spirit that is among the most
              vibrant in the world.
            </p>
            <p>
              <br />
            </p>
            <p>
              From the cradle of humanity to the mesmerizing sights and sounds that stir the soul, every corner of
              Africa offers a unique and captivating story. Whether you are seeking the holiday adventure of a lifetime
              or the perfect environment to grow your business, Tribe Africa is here to connect you to the wealth of
              opportunities this incredible continent has to offer.
            </p>
            <p>
              <br />
            </p>
            <p>
              Embark on your journey with Tribe Africa where your next holiday, business venture, or cultural discovery
              awaits you. The future is African.
            </p>
          </div>
          <div id="welcome-footer" className="text-sm flex gap-2">
            <span>
              join <TribeAfrica />
            </span>
            <span>and be a part of the future. welcome to the tribe.</span>
          </div>
        </div>
        <div className="grid justify-content-center h-full m-auto md:max-w-96 animate-on-scroll">
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left Image */}
            <div>
              <img
                src={welcomeImage1}
                alt="Person in suit"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Top Right Image */}
            <div>
              <img
                src={welcomeImage2}
                alt="Aerial view of coastline"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Full-Width Image */}
          <div className="mt-4">
            <img src={welcomeImage3} alt="Person on boat" className="w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </span>
    </div>
  );
};

export default Explore;
