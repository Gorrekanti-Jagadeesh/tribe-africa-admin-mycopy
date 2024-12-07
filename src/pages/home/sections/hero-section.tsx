import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Countries, Purpose } from '@data/index';

// HeroSection Component

interface HeroSectionProps {
  video: string;
  image: string;
}
const HeroSection: React.FC<HeroSectionProps> = ({ video, image }) => {
  const [country, setCountry] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoClick = () => {
    if (country) {
      purpose === 'business' ? navigate(`/${country}/business`) : navigate(`/${country}/holiday`);
    }
  };

  return (
    <div className="m-auto max-w-6xl">
      <div className="text-center relative p-2 animate-on-scroll">
        <div className="flex gap-2 p-4 py-2 bg-white m-auto w-full md:max-w-96 rounded-xl shadow-lg">
          <div className="flex gap-2 flex-grow">
            <Dropdown
              placeholderText="Where to?"
              options={Countries}
              searchable={true}
              action={setCountry}
              buttonStyles={'justify-center bg-slate-200 p-2 md:p-4'}
            />
            <Dropdown
              placeholderText="For?"
              options={Purpose}
              searchable={false}
              action={setPurpose}
              buttonStyles={'justify-center bg-slate-200 p-2 md:p-4'}
            />
          </div>
          <button
            className={`border rounded-lg text-white px-4 bg-orange-500 disabled:bg-slate-400`}
            onClick={handleGoClick}
            disabled={!country || !purpose}
          >
            <span className="">Go</span>
          </button>
        </div>
        <div className="bg-slate-800 relative bottom-8 rounded-lg" style={{ zIndex: '-1' }}>
          <video autoPlay={true} loop={true} muted={true} className="rounded-lg">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div id="landing-logo" className="animate-on-scroll max-w-xl m-auto">
        <img
          className="m-auto w-100 p-4"
          role="presentation"
          loading="lazy"
          src={image}
          sizes="(max-width: 638px) 89vw, (max-width: 998px) 39vw, 35vw"
        />
      </div>
    </div>
  );
};

// Logo Component
const Logo: React.FC = () => {
  return (
    <div id="landing-logo" className="animate-on-scroll max-w-xl m-auto">
      <img
        className="m-auto w-100 p-4"
        role="presentation"
        loading="lazy"
        src="https://firebasestorage.googleapis.com/v0/b/deep-byte-410311.appspot.com/o/tribe-africa-map.png?alt=media&amp;token=b982ee6d-a687-4467-b7e7-6f0fb22d4ede"
        sizes="(max-width: 638px) 89vw, (max-width: 998px) 39vw, 35vw"
      />
    </div>
  );
};

export default HeroSection;
