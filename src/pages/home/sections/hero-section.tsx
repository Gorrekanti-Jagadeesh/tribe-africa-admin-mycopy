import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Countries, Purpose } from '@data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

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
        <div className="flex gap-2 p-4 py-2 bg-white m-auto rounded-xl shadow-lg" style={{ width: 'fit-content' }}>
          <div className="flex gap-2">
            <Dropdown
              iconVisible={false}
              placeholderText="Where to?"
              options={Countries}
              searchable={true}
              action={setCountry}
              buttonStyles={'bg-slate-200 md:w-48 p-2 md:p-4'}
            />
            <Dropdown
              iconVisible={false}
              placeholderText="For?"
              options={Purpose}
              searchable={false}
              action={setPurpose}
              buttonStyles={'bg-slate-200 md:w-48 p-2 md:p-4'}
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
              src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=puNVfQdm3~hGUculdZ-XbsJyi4-OcR6DHCzDz3Th~XMfJjvqW9AqEP9HGRK3IWruDNz6Y6KkStL1AalESbTYe8-sYYodjddl8qf1VS5nPDR7vyoaSrKa0G7lHBAxbMYWwHNVMZBDf-PIzaxqWZHdUWMFTXrYQ0wsk31WdrlGS-ivOBtENsRC0MFkm7xKxJIqOmE09ev~fTjcL8jALXoKpraIw1y3MkmkXtjoFkZd~ntix40o9pyifWaZ~BDvviz9e4U7KrrYq4UYXsZ3TJHjNI1YVYDp6R5M0OjN3borMndRJn4tGHzUPiocnS83ZbRabIlSuhEtgaxZPUu7MBD8CA__"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="float-right">
          <p className="bg-orange-500 text-white p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faMessage} className="relative top-1 mx-2" /> Ask me anything!
          </p>
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
