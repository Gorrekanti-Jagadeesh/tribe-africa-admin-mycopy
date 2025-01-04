import React, { useState } from 'react';
import africaLogo from '../../assets/logo.png';

import { MenuBar } from '../menu/menu-bar';
import { IoMenu } from 'react-icons/io5';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Languages } from '../../data';
import { Link } from 'react-router-dom';
import Modal from '@molecules/modal';
import HoverNavLink from './hover-nav-link';
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
    <div className="grid gap-2 m-auto my-4 max-w-6xl relative">
      <MenuBar purpose={purpose} country={country} />
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {modalContent}
      </Modal>

      {/* Mobile Header */}
      <div className="flex gap-2 justify-between items-center md:hidden">
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
        <div className="flex flex-col gap-1 p-2 bg-slate-950 text-white text-left mt-2 md:hidden">
          {menuItems.map((item) =>
            item.isNavLink ? (
              <HoverNavLink key={item.id} id={item.id} title={item.title} content={item.content} />
            ) : (
              <div key={item.id} id={item.id} className="cursor-pointer flex-1" title="know more">
                <Link to={item.redirect}>{item.title}</Link>
              </div>
            )
          )}
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:flex gap-2 border-2 rounded-lg relative px-4">
        {/* Splitting the menuitems to bring logo in center position */}
        {menuItems.slice(0, midIndex).map((item) =>
          item.isNavLink ? (
            <HoverNavLink key={item.id} id={item.id} title={item.title} content={item.content} />
          ) : (
            <div key={item.id} id={item.id} className="m-auto cursor-pointer" title="know more">
              <Link to={item.redirect}>{item.title}</Link>
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
              <Link to={item.redirect}>{item.title}</Link>
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
