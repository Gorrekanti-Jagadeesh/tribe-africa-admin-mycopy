import { useState } from 'react';
import Dropdown from '../../../atoms/dropdown/DropdownSearch';
import { useNavigate } from 'react-router';

// Demo data: countries and purpose
interface Option {
  value: string;
  label: string;
}

// Countries and Purpose data
const Countries: Option[] = [
  {
    value: 'Algeria',
    label: 'Algeria',
  },
  {
    value: 'Angola',
    label: 'Angola',
  },
  {
    value: 'Benin',
    label: 'Benin',
  },
  {
    value: 'Botswana',
    label: 'Botswana',
  },
  {
    value: 'Burkina-faso',
    label: 'Burkina Faso',
  },
];

const Purpose: Option[] = [
  {
    value: 'Business',
    label: 'Business',
  },
  {
    value: 'Holiday',
    label: 'Holiday',
  },
];

// Intro Component
const Toggle: React.FC = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleGoClick = () => {
    purpose === 'Business' ? navigate(`/${country}/business`) : navigate(`/${country}/holiday`);
  };

  return (
    <div className="text-center relative p-2 animate-on-scroll">
      <div className="flex gap-2 bg-white p-2 m-auto rounded-xl shadow-lg" style={{ width: 'fit-content' }}>
        <div className="flex gap-2">
          <Dropdown text="Where to?" options={Countries} searchable={true} action={setCountry} />
          <Dropdown text="Purpose?" options={Purpose} searchable={false} action={setPurpose} />
        </div>
        <button
          className={`border rounded-lg text-white px-4 ${country && purpose ? 'bg-orange-500' : 'bg-slate-400'}`}
          onClick={handleGoClick}
        >
          <span className="">Go</span>
        </button>
      </div>
      <div className="bg-slate-800 relative bottom-8 rounded-lg" style={{ zIndex: '-1' }}>
        <video autoPlay={true} loop={true} muted={true} className="rounded-lg">
          <source
            src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c0N438-gTU9-AH0PTknkSn3aF-BkBSGpuY2XYaiZUmYK-FxIMnrUlZu5DZvCcguU5qAjTGoB5Ld8dZ3oR4n~qt9ggbOpnl~yfBAzFV~gXIEiTQOJvm4BrQHpAON-oHril5Kk8LCgQb1dQzWV48AmTT~5MSS7QkuZ0vUH4Tue4VotNxTcn9pLP~OvS0CdfKwltfHcal5YrJ2LksgLhUluqA-t5XyTa3dfjG-Uf~sYuOF~rsP56wxPe7JvQLdRYRC1hBG7yFyYkIVyuQ4VM6Xqboo3T5jnfT5myfuUe4jCBdI1fTpLivoWhacau~jCRFs2K8u74ZmXuXcC4nPJnnJ2oQ__"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="float-right">
        <p className="bg-yellow-500 p-3 rounded cursor-pointer">chatbot</p>
      </div>
    </div>
  );
};

// Logo Component
const Logo: React.FC = () => {
  return (
    <div id="landing-logo" className=" animate-on-scroll">
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

const HeroSection = () => {
  return (
    <div className=" m-auto max-w-6xl">
      <Toggle />
      <Logo />
    </div>
  );
};

export default HeroSection;
