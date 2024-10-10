import React, { useState, useEffect, useRef } from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import spiralBackground from '../assets/spiral-background-dark.png';
import welcomeImage1 from '../assets/homepage-welcome-image.png';
import welcomeImage2 from '../assets/homepage-welcome-image-2.png';
import welcomeImage3 from '../assets/homepage-welcome-image-3.png';
import videoPlay from '../assets/Frame.png';

// The initial data object
const data = {
  country: null,
  purpose: null,
};

interface Option {
  value: string;
  label: string;
}

// Dropdown with Search
interface DropdownProps {
  text: string,
  options: Option[];
  action: (selectedOption: string) => void;
}

// Countries and Purpose data
const Countries: Option[] = [
  {
    value: "algeria",
    label: "Algeria"
  },
  {
    value: "angola",
    label: "Angola"
  },
  {
    value: "benin",
    label: "Benin"
  },
  {
    value: "botswana",
    label: "Botswana"
  },
  {
    value: "burkina-faso",
    label: "Burkina Faso"
  }
];

const Purpose: Option[] = [
  {
    value: "business",
    label: "Business"
  },
  {
    value: "holiday",
    label: "Holiday"
  }
];

// Dropdown component
const Dropdown: React.FC<DropdownProps> = ({ text, options, action }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState(text);

  const ref = useDetectClickOutside({ onTriggered: () => {
    setIsOpen(false);
  } });

  const filteredOptions = options.filter(option =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setPlaceholder(option);
    setIsOpen(false);
    action(option)
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="w-24 md:w-48 bg-slate-200 p-2 rounded-md cursor-pointer truncate"
        onClick={handleButtonClick}
      >
        {placeholder}
      </button>
      <ul
        className={`absolute top-100% left-0 z-10 w-full bg-white border border-gray-300 rounded-md max-h-200 overflow-y-auto p-0 m-0 list-none ${isOpen ? 'block' : 'hidden'}`}
      >
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {filteredOptions.map(option => (
          <li
            key={option.value}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleOptionClick(option.label)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Intro Component
const Toggle: React.FC = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);

  return (
    <div className="text-center relative">
      <div className="flex gap-2 bg-white p-2 m-auto rounded-xl shadow-lg" style={{ width: 'fit-content'}}>
        <div className="flex gap-2">
          <Dropdown text="Where to?" options={Countries} action={setCountry}/>
          <Dropdown text="Purpose?" options={Purpose} action={setPurpose}/>
        </div>
        <button
          className={`border rounded-lg text-white px-4 ${country && purpose ? 'bg-orange-500' : 'bg-slate-400'}`}
        >
          <span className="">Go</span>
        </button>
      </div>
      <div className="bg-slate-800 relative bottom-8 rounded-lg" style={{ zIndex: "-1"}}>
        <video autoPlay={true} loop={true} muted={true} className="rounded-lg">
          <source src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c0N438-gTU9-AH0PTknkSn3aF-BkBSGpuY2XYaiZUmYK-FxIMnrUlZu5DZvCcguU5qAjTGoB5Ld8dZ3oR4n~qt9ggbOpnl~yfBAzFV~gXIEiTQOJvm4BrQHpAON-oHril5Kk8LCgQb1dQzWV48AmTT~5MSS7QkuZ0vUH4Tue4VotNxTcn9pLP~OvS0CdfKwltfHcal5YrJ2LksgLhUluqA-t5XyTa3dfjG-Uf~sYuOF~rsP56wxPe7JvQLdRYRC1hBG7yFyYkIVyuQ4VM6Xqboo3T5jnfT5myfuUe4jCBdI1fTpLivoWhacau~jCRFs2K8u74ZmXuXcC4nPJnnJ2oQ__" type="video/mp4" />
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
    <div id="landing-logo" className="">
      <img
        className="m-auto"
        role="presentation"
        loading="lazy"
        style={{ width: '100%', maxWidth: '400px', maxHeight: '100%' }}
        src="https://firebasestorage.googleapis.com/v0/b/deep-byte-410311.appspot.com/o/tribe-africa-map.png?alt=media&amp;token=b982ee6d-a687-4467-b7e7-6f0fb22d4ede"
        sizes="(max-width: 638px) 89vw, (max-width: 998px) 39vw, 35vw"
      />
    </div>
  );
};

// Landing page welcome section
const Welcome: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white p-2 md:p-8 lg:p-12 grid md:flex gap-4 md:gap-8 lg:gap-28"
      style={{ backgroundImage: `url(${spiralBackground})` }}
    >
      <div id="welcome-content" className="grid gap-8 p-4">
        <h4 className="text-3xl">
          Explore Africa For <br />
          <span className="text-5xl">
            <span className="font-serif text-orange-500">Business</span> & Tourism
          </span>
        </h4>
        <div id="about-africa" className="grid gap-3 text-sm">
          <p>Africa is a continent of 54 countries, abundant with a wealth of culture, talent, and awe-inspiring beauty to be discovered.</p>
          <p>A treasure trove of untapped potential for tourism and business. At her core is a young, vibrant population, brimming with entrepreneurial spirit; some of the most naturally born Entrepreneurs in the world.</p>
          <p>From the cradle of humanity to the captivating mysteries an melodies that stir the soul, every corner of this land tells a unique story.</p>
        </div>
        <div id="welcome-footer" className="text-sm">
          join <b><i>Tribe Africa</i></b> and be a part of the future. welcome to the tribe.
        </div>
      </div>
      <div className="grid justify-content-center h-full md:max-w-96">
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
          <img
            src={welcomeImage3}
            alt="Person on boat"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

// Experience/Video section
const Experience: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play(); // Play the video programmatically
    }
  };

  return (
    <div className="p-2 md:p-4 lg:p-12 grid gap-6 my-8">
      <h3 className="text-4xl text-center">
        Get Ready for a{" "}
        <span className="font-serif text-orange-500">Life Changing Experience</span>
      </h3>
      <div className="bg-slate-800 rounded-lg relative">
        {!playing && (
          <button
            className="text-white absolute top-0 bottom-0 right-0 left-0 cursor-pointer"
            onClick={handlePlay}
            style={{ zIndex: 1 }}
          >
            <img src={videoPlay} className="m-auto" style={{ maxWidth: "60px"}}/>
          </button>
        )}
        <video
          ref={videoRef}
          loop={false}
          muted={true}
          className="rounded-lg"
          style={{ zIndex: 0 }}
          onEnded={() => setPlaying(false)}
        >
          <source
            src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c0N438-gTU9-AH0PTknkSn3aF-BkBSGpuY2XYaiZUmYK-FxIMnrUlZu5DZvCcguU5qAjTGoB5Ld8dZ3oR4n~qt9ggbOpnl~yfBAzFV~gXIEiTQOJvm4BrQHpAON-oHril5Kk8LCgQb1dQzWV48AmTT~5MSS7QkuZ0vUH4Tue4VotNxTcn9pLP~OvS0CdfKwltfHcal5YrJ2LksgLhUluqA-t5XyTa3dfjG-Uf~sYuOF~rsP56wxPe7JvQLdRYRC1hBG7yFyYkIVyuQ4VM6Xqboo3T5jnfT5myfuUe4jCBdI1fTpLivoWhacau~jCRFs2K8u74ZmXuXcC4nPJnnJ2oQ__"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

// Premier Services
const ServicesCard: React.FC = () => {
  return (
    <div className="my-4">
      <div className="border-2 border-gray-300 p-2 rounded" style={{ aspectRatio: "4/3"}}>
        <div className="relative bg-cover bg-center p-2 w-full h-full" style={{ backgroundImage: `url(${welcomeImage2})`}}>
        </div>
      </div>
      <div>
        <h6 className="font-bold text-sm">Executive Logistics</h6>
        <p className="text-sm">Fajara, The gambia</p>
      </div>
    </div>
  )
}

const Services: React.FC = () => {
  return (
    <div className="mx-4 my-12 grid gap-2">
      <h3 className="text-4xl">Premier <span className="font-serif text-orange-500">Services</span></h3>
      <div id="services-container" className="grid grid-cols-3 gap-2">
        <ServicesCard/>
        <ServicesCard/>
        <ServicesCard/>
      </div>
      <div id="add-service">
        <div className="bg-black border-2 border-orange-500 rounded-md text-white text-center p-8 grid gap-4">
          <h4 className=" text-lg font-bold">
            Want to List your business in Tribe Africa
          </h4>
          <p className="text-sm">
            Advertise your business on tribe africa and get massive traffic to your business
          </p>
          <button className="px-4 py-2 bg-orange-500 rounded-md text-white m-auto" style={{width: "fit-content"}}>
            Fill the form
          </button>
        </div>
      </div>
    </div>
  )
};

// Landing Component
const HomePage: React.FC = () => {
  return (
    <div className="gap-2 justify-content-center">
      <div className="m-2">
        <Toggle />
        <Logo />
      </div>
      <Welcome />
      <Experience />
      <Services />
    </div>
  );
};

export default HomePage;
