import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import africaLogo from '../../assets/logo.png';
import { MenuBar } from '../menu/menu-bar';
import { IoMenu } from 'react-icons/io5';
import Dropdown from '@atoms/dropdown/dropdown-search';
import { Languages } from '../../data';
import { Link } from 'react-router-dom';
import Modal from '@molecules/modal';
import DroppingNav from './dropping-nav';
import { ModalProvider, useModalContext } from '@context/modalContext';
const JSX = ({ country, purpose, menuItems }) => {
  const midIndex = Math.floor(menuItems.length / 2);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { modalIsOpen, setModalIsOpen, modalContent } = useModalContext();
  return _jsxs('div', {
    className: 'grid gap-2 m-auto my-4 max-w-6xl relative',
    children: [
      _jsx(MenuBar, { purpose: purpose, country: country }),
      _jsx(Modal, { isOpen: modalIsOpen, setIsOpen: setModalIsOpen, children: modalContent }),
      _jsxs('div', {
        className: 'flex gap-2 justify-between items-center md:hidden',
        children: [
          _jsx('div', {
            className: 'relative',
            children: _jsx('button', {
              className: 'border rounded',
              children: _jsx(Dropdown, {
                iconVisible: true,
                placeholderText: 'English',
                searchable: false,
                options: Languages,
                action: () => {},
                buttonStyles: 'md:w-24 py-1 px-2',
              }),
            }),
          }),
          _jsx('div', {
            id: 'logo',
            className: 'm-auto cursor-pointer',
            children: _jsx('img', { src: africaLogo, style: { maxWidth: '100px' } }),
          }),
          _jsxs('button', {
            onClick: () => setIsMenuOpen(!isMenuOpen),
            className: 'border rounded px-2 py-1 flex justify-center items-center',
            children: [_jsx(IoMenu, {}), 'Menu'],
          }),
        ],
      }),
      isMenuOpen &&
        _jsx('div', {
          className: 'flex flex-col gap-1 p-2 bg-slate-950 text-white text-left mt-2 md:hidden',
          children: menuItems.map((item) =>
            item.isNavLink
              ? _jsx(DroppingNav, { id: item.id, title: item.title, content: item.content }, item.id)
              : _jsx(
                  'div',
                  {
                    id: item.id,
                    className: 'cursor-pointer flex-1',
                    title: 'know more',
                    children: _jsx(Link, { to: item.redirect, children: item.title }),
                  },
                  item.id
                )
          ),
        }),
      _jsxs('div', {
        className: 'hidden md:flex gap-2 text-center border-2 rounded-lg relative px-4',
        children: [
          menuItems
            .slice(0, midIndex)
            .map((item) =>
              item.isNavLink
                ? _jsx(DroppingNav, { id: item.id, title: item.title, content: item.content }, item.id)
                : _jsx(
                    'div',
                    {
                      id: item.id,
                      className: 'm-auto cursor-pointer flex-1 hover:underline',
                      title: 'know more',
                      children: _jsx(Link, { to: item.redirect, children: item.title }),
                    },
                    item.id
                  )
            ),
          _jsx('div', {
            id: 'logo',
            className: 'm-auto cursor-pointer',
            children: _jsx('img', { src: africaLogo, style: { maxWidth: '150px' } }),
          }),
          menuItems
            .slice(midIndex)
            .map((item) =>
              item.isNavLink
                ? _jsx(DroppingNav, { id: item.id, title: item.title, content: item.content }, item.id)
                : _jsx(
                    'div',
                    {
                      id: item.id,
                      className: 'm-auto cursor-pointer flex-1 hover:underline',
                      title: 'know more',
                      children: _jsx(Link, { to: item.redirect, children: item.title }),
                    },
                    item.id
                  )
            ),
        ],
      }),
    ],
  });
};
export const Header = (props) => {
  return _jsx(ModalProvider, { children: _jsx(JSX, { ...props }) });
};
