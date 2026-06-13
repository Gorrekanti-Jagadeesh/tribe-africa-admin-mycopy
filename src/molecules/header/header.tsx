import React, { useState } from 'react';
import africaLogo from '../../assets/logo.png';
import { MenuBar } from '../menu/menu-bar';
import { IoMenu } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Modal from '@molecules/modal';
import DroppingNav from './dropping-nav';
import { ModalProvider, useModalContext } from '@context/modalContext';

interface MenuItemsProps {
  id: string;
  title?: string;
  isNavLink: boolean;
  content?: React.ReactNode;
  redirect?: string;
}

interface HeaderProps {
  country?: string;
  purpose?: string;
  menuItems: MenuItemsProps[];
}

const JSX: React.FC<HeaderProps> = ({ country, purpose, menuItems }) => {
  const midIndex = Math.floor(menuItems.length / 2);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { modalIsOpen, setModalIsOpen, modalContent } = useModalContext();

  return (
    <div className="max-w-8xl m-auto px-4 py-3">
      <MenuBar purpose={purpose} country={country} />
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {modalContent}
      </Modal>

      {/* Mobile Header */}
      <div className="relative flex items-center justify-center md:hidden mt-2">
        <div id="logo" className="mx-auto">
          <img src={africaLogo} alt="Tribe Africa" className="w-28 mx-auto" />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute right-0 border rounded-[10px] px-3 py-2 flex justify-center items-center gap-1 font-poppins font-medium text-sm"
        >
          <IoMenu className="text-lg" />
          Menu
        </button>
      </div>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="flex flex-col gap-1 p-3 bg-slate-950 text-white text-left mt-2 md:hidden rounded-[10px]">
          {menuItems.map((item) =>
            item.isNavLink ? (
              <DroppingNav key={item.id} id={item.id} title={item.title} content={item.content} />
            ) : (
              <div key={item.id} id={item.id} className="cursor-pointer flex-1 py-1 font-poppins font-medium text-lg">
                {item.redirect ? <Link to={item.redirect}>{item.title}</Link> : <span>{item.title}</span>}
              </div>
            )
          )}
        </div>
      )}

      {/* Desktop header — Figma: no border, logo centered 258×139, nav items 20px Poppins 500 */}
      <div className="hidden md:flex gap-2 items-center mt-2 relative">
        {/* Left nav items */}
        {menuItems.slice(0, midIndex).map((item) =>
          item.isNavLink ? (
            <DroppingNav key={item.id} id={item.id} title={item.title} content={item.content} />
          ) : (
            <div
              key={item.id}
              id={item.id}
              className="flex-1 text-center cursor-pointer font-poppins font-medium text-xl hover:text-brand-orange transition-colors duration-200"
            >
              {item.redirect ? <Link to={item.redirect}>{item.title}</Link> : <span>{item.title}</span>}
            </div>
          )
        )}

        {/* Centered logo — Figma: 258×139 */}
        <div id="logo" className="mx-4 cursor-pointer shrink-0">
          <img src={africaLogo} style={{ width: '258px', height: 'auto' }} alt="Tribe Africa" />
        </div>

        {/* Right nav items */}
        {menuItems.slice(midIndex).map((item) =>
          item.isNavLink ? (
            <DroppingNav key={item.id} id={item.id} title={item.title} content={item.content} />
          ) : (
            <div
              key={item.id}
              id={item.id}
              className="flex-1 text-center cursor-pointer font-poppins font-medium text-xl hover:text-brand-orange transition-colors duration-200"
            >
              {item.redirect ? <Link to={item.redirect}>{item.title}</Link> : <span>{item.title}</span>}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <ModalProvider>
      <JSX {...props} />
    </ModalProvider>
  );
};
