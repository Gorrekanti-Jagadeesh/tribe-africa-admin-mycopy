import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import homeLogo from '@assets/icons/common/home.svg';
import notificationLogo from '@assets/icons/common/notifications.svg';
import calculatorLogo from '@assets/icons/common/calculator.svg';
import CurrencyCalculator from '../common/currency-calculator';
import Modal from '../modal';
import { Auth } from '../auth';
import Dropdown from '../../atoms/dropdown/dropdown-search';
import { flags, Languages } from '../../data';
import i18n from '../../transaltionConfig';
import { fromKebabCase } from '@utils/common';
export const MenuBar = ({ purpose, country }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLanguageChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption); // Update i18next language
  };
  return _jsx(_Fragment, {
    children: _jsxs('div', {
      className: 'flex items-center',
      children: [
        _jsx('div', {
          id: 'languages',
          className: 'border-2 outline-0 rounded hidden md:block mr-2',
          style: { height: 'fit-content' },
          children: _jsx(Dropdown, {
            iconVisible: true,
            placeholderText: 'Language',
            searchable: false,
            options: Languages,
            action: handleLanguageChange,
            buttonStyles: 'md:w-32 ',
          }),
        }),
        country &&
          _jsx(Modal, {
            isOpen: isOpen,
            setIsOpen: setIsOpen,
            trigger: _jsx('img', { src: calculatorLogo, className: 'm-auto w-6' }),
            customClasses: 'flex items-center justify-center h-screen',
            closeButtonClasses: 'right-[19%] top-[33%] z-10',
            children: _jsx(CurrencyCalculator, {}),
          }),
        country != undefined &&
          _jsxs('div', {
            className: 'mx-4 flex gap-2 justify-center align-middle items-center',
            children: [
              _jsx('img', {
                src: flags[country],
                className: 'w-9 aspect-square rounded-full object-cover border border-gray-300',
              }),
              _jsxs('p', { children: [purpose != 'holiday' ? 'Business' : 'Holiday', ' in ', fromKebabCase(country)] }),
            ],
          }),
        _jsx('div', {
          id: 'menu',
          className: 'ms-auto',
          children: _jsxs('div', {
            className: 'flex gap-3',
            children: [
              _jsxs('div', {
                className: 'flex items-center gap-3',
                children: [
                  _jsx('img', { src: homeLogo, className: 'm-auto w-6 cursor-pointer' }),
                  _jsx('img', { src: notificationLogo, className: 'm-auto w-6 cursor-pointer' }),
                ],
              }),
              _jsx(Auth, {}),
            ],
          }),
        }),
      ],
    }),
  });
};
