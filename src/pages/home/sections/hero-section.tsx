import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Countries, Purpose } from '@data/index';
import { toKebabCase } from '@/utils/common';

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
      purpose === 'business'
        ? navigate(`/${toKebabCase(country)}/business`)
        : navigate(`/${toKebabCase(country)}/holiday`);
    }
  };

  return (
    <div className="m-auto max-w-8xl px-4">
      <div className="text-center relative p-2 animate-on-scroll">
        {/* Search widget
            Desktop (≥700px): 700×100, white, radius=10, items side-by-side, gap=24, pad=0 28
            Mobile (<700px): stacks vertically, full-width */}
        <div className="bg-white m-auto w-full max-w-[700px] rounded-[10px] shadow-lg">
          {/* Desktop layout */}
          <div className="hidden sm:flex gap-6 px-7 h-[100px] items-center justify-center">
            <div className="flex gap-6 flex-grow h-[65px]">
              <Dropdown
                placeholderText="Where to?"
                options={Countries}
                searchable={true}
                action={setCountry}
                buttonStyles="justify-center bg-[#EDEBEB] rounded-[10px] h-full font-poppins font-medium text-xl flex-1"
              />
              <Dropdown
                placeholderText="For?"
                options={Purpose}
                searchable={false}
                action={setPurpose}
                buttonStyles="justify-center bg-[#EDEBEB] rounded-[10px] h-full font-poppins font-medium text-xl"
              />
            </div>
            <button
              className="h-[65px] w-[87px] bg-brand-orange rounded-[10px] text-white font-poppins font-medium text-xl disabled:bg-gray-400 shrink-0 hover:bg-[#E05A00] transition-colors duration-200"
              onClick={handleGoClick}
              disabled={!country || !purpose}
            >
              Go
            </button>
          </div>

          {/* Mobile layout (< sm = < 640px) */}
          <div className="flex flex-col sm:hidden gap-3 p-4">
            <Dropdown
              placeholderText="Where to?"
              options={Countries}
              searchable={true}
              action={setCountry}
              buttonStyles="w-full justify-center bg-[#EDEBEB] rounded-[10px] py-3 font-poppins font-medium text-base"
            />
            <Dropdown
              placeholderText="For?"
              options={Purpose}
              searchable={false}
              action={setPurpose}
              buttonStyles="w-full justify-center bg-[#EDEBEB] rounded-[10px] py-3 font-poppins font-medium text-base"
            />
            <button
              className="w-full py-3 bg-brand-orange rounded-[10px] text-white font-poppins font-medium text-base disabled:bg-gray-400 hover:bg-[#E05A00] transition-colors duration-200"
              onClick={handleGoClick}
              disabled={!country || !purpose}
            >
              Go
            </button>
          </div>
        </div>

        {/* Hero video */}
        <div className="bg-slate-800 relative bottom-8 rounded-[10px]" style={{ zIndex: '-1' }}>
          <video autoPlay={true} loop={true} muted={true} className="rounded-[10px] w-full">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Brand map logo */}
      <div id="landing-logo" className="animate-on-scroll max-w-3xl m-auto -mt-4">
        <img
          className="m-auto w-full p-4"
          role="presentation"
          loading="lazy"
          src={image}
          sizes="(max-width: 638px) 89vw, (max-width: 998px) 39vw, 35vw"
        />
      </div>
    </div>
  );
};

export default HeroSection;
