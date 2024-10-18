import React, { useState } from 'react';
import { MenuBar } from '../menu/MenuBar';
import africaLogo from '../../assets/logo.png';
import Discover from '../../pages/home/navbar-section/discover-section/discover-screen';

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

export const HomeHeader = () => {
  return (
    <div className="grid gap-2 p-2 m-auto max-w-6xl">
      <div>
        <MenuBar purpose={null} country={null} />
      </div>
      <div className="hidden text-center border-2 rounded-lg relative md:flex">
        <HoverNavLink id="getting-there" title="Getting there" content={<>Content</>} />
        <HoverNavLink id="discover" title="Discover" content={<Discover />} />
        <HoverNavLink id="events" title="Events" content={<>Content</>} />
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '150px' }} />
        </div>
        <HoverNavLink id="institute-collaboration" title={'Peace & Prosperity Institute'} content={<>Content</>} />
        <div id="blog" className="m-auto cursor-pointer">
          <span>Blog</span>
        </div>
        <div id="contact" className="m-auto cursor-pointer">
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};
