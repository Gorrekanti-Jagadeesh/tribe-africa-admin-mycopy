import { useState } from 'react';

import homeLogo from '../../assets/icons/home.png';
import notificationLogo from '../../assets/icons/notification.png';
import calculatorLogo from '../../assets/icons/calculator.png';

import CurrencyConverter from '../common/currency-converter';
import Modal from '../modal';
import { Auth } from '../auth';
import Dropdown from '../../atoms/dropdown/dropdown-search';
import { Languages } from '../../data';

export const MenuBar = ({ purpose, country }: { purpose: string | undefined; country: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-center align-center">
        <div id="languages" className="border-2 outline-0 rounded hidden md:block" style={{ height: 'fit-content' }}>
          <Dropdown
            iconVisible={true}
            placeholderText="Language"
            searchable={false}
            options={Languages}
            action={() => {}}
            buttonStyles={'md:w-32 '}
          />
        </div>

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={<img src={calculatorLogo} className="m-auto w-8 md:hidden" />}
        >
          <CurrencyConverter />
        </Modal>

        {country != undefined && (
          <div className="mx-4">
            <p>
              {purpose == 'business' ? 'Business' : 'Holiday'} in {country}
            </p>
          </div>
        )}
        <div id="menu" className="ms-auto">
          <div className="flex justify-center gap-3">
            <img src={homeLogo} className="m-auto w-6" />
            <img src={notificationLogo} className="m-auto w-6" />

            {/* Currency converter */}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} trigger={<img src={calculatorLogo} className="w-6" />}>
              <CurrencyConverter />
            </Modal>

            {/* Authentication component */}
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};
