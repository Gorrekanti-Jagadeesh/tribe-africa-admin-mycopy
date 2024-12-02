import React, { useState } from 'react';
import africaLogo from '../../assets/logo.png';

import { MenuBar } from '../menu/menu-bar';
import { ChevronDownSVG } from '../../assets/svgs/chevron-down-svg';
import { IoMenu } from 'react-icons/io5';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Languages } from '../../data';
import Close from '@atoms/custom-button/close-button';

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
      className="md:m-auto group py-2 md:py-4 px-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="flex md:justify-center md:items-center cursor-pointer text-white md:text-black">
        {title}
        <span className="hidden md:block">
          <ChevronDownSVG />
        </span>
      </span>
      <div
        className={`fixed md:absolute left-0 top-0 md:top-auto p-2 mt-1 w-full max-h-screen overflow-auto border-2 border-orange-500 bg-black text-white rounded transition-opacity z-20 ${hover ? 'visible' : 'invisible'}`}
      >
        <Close className="float-right" theme="light" size="6" onClick={() => setHover(false)} />
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="grid gap-2 p-4 m-auto my-4 max-w-6xl relative">
      <MenuBar purpose={purpose} country={country} />

      {/* Mobile Header */}
      <div className="flex justify-between items-center md:hidden">
        <div className="relative">
          <button className="border rounded">
            {/* English <span className="caret" /> */}
            <Dropdown
              iconVisible={true}
              placeholderText="English"
              searchable={false}
              options={Languages}
              action={() => {}}
              buttonStyles={'md:w-24 py-1 px-2'}
            />
          </button>
        </div>
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '100px' }} />
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="border rounded px-2 py-1 flex justify-center items-center"
        >
          <IoMenu />
          Menu
        </button>
      </div>

      {/* Menu Items for Mobile */}
      {isMenuOpen && (
        <div className="flex flex-col bg-slate-950 mt-2 md:hidden">
          {menuItems.map((item) =>
            item.isNavLink ? (
              <HoverNavLink key={item.id} id={item.id} title={item.title} content={item.content} />
            ) : (
              <div key={item.id} id={item.id} className="m-auto cursor-pointer" title="know more">
                <span>{item.title}</span>
              </div>
            )
          )}
        </div>
      )}

      {/* Desktop Header */}
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
