import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Countries, Purpose } from '@data/index';

// HeroSection Component
const HeroSection: React.FC = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoClick = () => {
    if (country) {
      purpose === 'Business' ? navigate(`/${country}/business`) : navigate(`/${country}/holiday`);
    }
  };

  return (
    <div className="m-auto max-w-6xl">
      <div className="text-center relative p-2 animate-on-scroll">
        <div className="flex gap-2 p-4 py-2 bg-white m-auto w-full md:max-w-96 rounded-xl shadow-lg">
          <div className="flex gap-2 flex-grow">
            <Dropdown
              iconVisible={false}
              placeholderText="Where to?"
              options={Countries}
              searchable={true}
              action={setCountry}
              buttonStyles={'bg-slate-200 p-2 md:p-4'}
            />
            <Dropdown
              iconVisible={false}
              placeholderText="For?"
              options={Purpose}
              searchable={false}
              action={setPurpose}
              buttonStyles={'bg-slate-200 p-2 md:p-4'}
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
            <source
              src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o7OUUiRWnyMJNQ4TDigoXivMvWn~oTGmSt5hezNx57w1szkfUr4Pt-aB3gAtc8U1sj2vmMuR8t4gutWJ0dMg43eRrIJnwatAXVNCzfJaN7hUq8MlzXt~KMO98rh717eXzYJWc2dpe6VM1f6ebFAR97ZCM3PLWKORGiiFTI2H0Z189vAEEdAnjimaCbSPc1WGPtd6gI3Cd64DS8-oP7T4QAwQw4g~h6423d1eRIZv2ydz04yPjAKXiqTBd-s4YY-qHUw4WcEDOlxmweg1q3xxiQPPYYS7IMLYhM0x7IjIxCmMjveAsmKY9GbZYOqHOYMdxtDbL2hdZT8J2OopU1xGZw__"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Logo />
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
