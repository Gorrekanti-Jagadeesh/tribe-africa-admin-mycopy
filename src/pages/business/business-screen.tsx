import UpcomingEvents from './sections/upcoming-events';

import Footer from '@molecules/footer';
import { BusinessHeader } from '@molecules/header';
import heroBackground from '@assets/homepage-welcome-image-2.png';
import CardsGrid from '@molecules/layout/cards-grid';

const BusinessScreen = ({ country }: { country: string | undefined }) => {
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="bg-orange-500 p-4 text-white text-xl text-center">
        <p>Getting there - Book Flight and accomodation</p>
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
          <div className="text-white text-lg flex flex-col gap-6 p-8 absolute bottom-0 brightness-200">
            <p className="">Weather: 28 °/cloudy</p>
            <p>Internet speed: 1gbps</p>
            <p>Time: 12:58 pm</p>
          </div>
        </div>
      </div>

      {/* Cards layout for 'Key Invesment Sectors' */}
      <CardsGrid
        heading={
          <>
            Key <span className="font-serif text-orange-500">Investment Sectors</span> in {country}
          </>
        }
        data={[]}
      />

      {/* Upcoming events */}
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default BusinessScreen;
