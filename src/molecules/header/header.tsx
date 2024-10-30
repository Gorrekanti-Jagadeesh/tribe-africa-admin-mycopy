import React, { useState } from 'react';
import africaLogo from '../../assets/logo.png';

import { MenuBar } from '../menu/menu-bar';

interface HoverNavLinkProps {
  id: string;
  title?: string;
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

interface MenuItemsProps {
  id: string;
  title?: string;
  isNavLink: boolean;
  content: React.ReactNode | null;
}

interface HeaderProps {
  country?: string;
  purpose?: string;
  menuItems: MenuItemsProps[];
}

export const Header: React.FC<HeaderProps> = ({ country, purpose, menuItems }) => {
  const midIndex = Math.floor(menuItems.length / 2);

  return (
    <div className="grid gap-2 p-4 m-auto my-4 max-w-6xl">
      <div>
        <MenuBar purpose={purpose} country={country} />
      </div>
      <div className="hidden justify-center items-center text-center border-2 rounded-lg relative md:flex">
        {/* Splitting the menuitems to bring logo in center position */}
        {menuItems.slice(0, midIndex).map((item) =>
          item.isNavLink ? (
            <HoverNavLink key={item.id} id={item.id} title={item.title} content={item.content} />
          ) : (
            <div key={item.id} id={item.id} className="m-auto cursor-pointer" title="know more">
              <span>{item.title}</span>
            </div>
          )
        )}

        {/* Centered logo */}
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '150px' }} />
        </div>

        {/* Second half of the header elements */}
        {menuItems.slice(midIndex).map((item) =>
          item.isNavLink ? (
            <HoverNavLink key={item.id} id={item.id} title={item.title} content={item.content} />
          ) : (
            <div key={item.id} id={item.id} className="m-auto cursor-pointer" title="know more">
              <span>{item.title}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};
