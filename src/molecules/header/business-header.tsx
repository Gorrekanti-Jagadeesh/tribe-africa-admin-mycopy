import React, { useState } from 'react';
import africaLogo from '../../assets/logo.png';
import { MenuBar } from '../menu/MenuBar';
import { TravelKnowledge } from '../../pages/business/navbar-section/travel-knowledge/travel-knowledge';
import Blogs from '../../pages/home/navbar-section/blog-section/blog-container';
import Network from '../../pages/business/navbar-section/network/network-container';

interface HoverNavLinkProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

const HoverNavLink: React.FC<HoverNavLinkProps> = ({ id, title, content }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      id={id}
      className="m-auto group py-4 px-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="flex cursor-pointer">
        {title}
        <svg
          className="w-2.5 h-2.5 ms-3 m-auto"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </span>
      <div
        className={`absolute left-0 p-2 mt-1 w-full max-h-screen overflow-auto border-2 border-orange-500 bg-black text-white rounded transition-opacity z-20 ${hover ? 'visible' : 'invisible'}`}
      >
        {content}
      </div>
    </div>
  );
};

export const BusinessHeader = ({ country }: { country: string | undefined }) => {
  return (
    <div className="grid gap-2 p-4 m-auto my-4 max-w-6xl">
      <div>
        <MenuBar purpose={'business'} country={country} />
      </div>
      <div className="hidden text-center border-2 rounded-lg relative md:flex">
        <div id="country" className="m-auto cursor-pointer" title="know more">
          <span>{country}</span>
        </div>
        <HoverNavLink id="network" title="Network" content={<Network />} />
        <HoverNavLink id="market-place" title="Market Place" content={<>Content</>} />
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '150px' }} />
        </div>
        <HoverNavLink id="after-work" title={'After Work'} content={<>Content</>} />
        <HoverNavLink id="travel-knowledge" title={'Travel Knowledge'} content={<TravelKnowledge />} />
        <HoverNavLink id="blogs" title="Blogs" content={<Blogs />} />
      </div>
    </div>
  );
};
