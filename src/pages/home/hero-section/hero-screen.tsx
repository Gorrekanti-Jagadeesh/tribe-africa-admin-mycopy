import React from 'react';
import Dropdown from '../../../atoms/dropdown/dropdown-search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

// Props interface for HeroScreen
interface HeroScreenProps {
  country: string | null;
  purpose: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
  setPurpose: React.Dispatch<React.SetStateAction<string | null>>;
  handleGoClick: () => void;
  countries: { value: string; label: string }[];
  purposes: { value: string; label: string }[];
}

// Hero Screen Component
const HeroScreen: React.FC<HeroScreenProps> = ({
  country,
  purpose,
  setCountry,
  setPurpose,
  handleGoClick,
  countries,
  purposes,
}) => {
  return (
    <div className="m-auto max-w-6xl">
      <div className="text-center relative p-2 animate-on-scroll">
        <div className="flex gap-2 p-4 py-2 bg-white m-auto rounded-xl shadow-lg" style={{ width: 'fit-content' }}>
          <div className="flex gap-2">
            <Dropdown text="Where to?" options={countries} searchable={true} action={setCountry} />
            <Dropdown text="For?" options={purposes} searchable={false} action={setPurpose} />
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
              src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c0N438-gTU9-AH0PTknkSn3aF-BkBSGpuY2XYaiZUmYK-FxIMnrUlZu5DZvCcguU5qAjTGoB5Ld8dZ3oR4n~qt9ggbOpnl~yfBAzFV~gXIEiTQOJvm4BrQHpAON-oHril5Kk8LCgQb1dQzWV48AmTT~5MSS7QkuZ0vUH4Tue4VotNxTcn9pLP~OvS0CdfKwltfHcal5YrJ2LksgLhUluqA-t5XyTa3dfjG-Uf~sYuOF~rsP56wxPe7JvQLdRYRC1hBG7yFyYkIVyuQ4VM6Xqboo3T5jnfT5myfuUe4jCBdI1fTpLivoWhacau~jCRFs2K8u74ZmXuXcC4nPJnnJ2oQ__"
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

export default HeroScreen;
