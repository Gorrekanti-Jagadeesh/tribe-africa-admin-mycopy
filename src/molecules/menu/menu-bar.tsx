import { useState } from 'react';
import homeLogo from '@assets/icons/common/home.svg';
import notificationLogo from '@assets/icons/common/notifications.svg';
import calculatorLogo from '@assets/icons/common/calculator.svg';
import CurrencyCalculator from '../common/currency-calculator';
import Modal from '../modal';
import { Auth } from '../auth';
import Dropdown from '../../atoms/dropdown/dropdown-search';
import { Languages } from '../../data';
import i18n from '../../transaltionConfig';

export const MenuBar = ({ purpose, country }: { purpose: string | undefined; country: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (selectedOption: string) => {
    i18n.changeLanguage(selectedOption); // Update i18next language
  };

  return (
    <>
      <div className="flex items-center">
        <div
          id="languages"
          className="border-2 outline-0 rounded hidden md:block mr-2"
          style={{ height: 'fit-content' }}
        >
          <Dropdown
            iconVisible={true}
            placeholderText="Language"
            searchable={false}
            options={Languages}
            action={handleLanguageChange}
            buttonStyles={'md:w-32 '}
          />
        </div>

        {country && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} trigger={<img src={calculatorLogo} className="m-auto w-6" />}>
            <CurrencyCalculator />
          </Modal>
        )}

        {country != undefined && (
          <div className="mx-4">
            <p>
              {purpose != 'holiday' ? 'Business' : 'Holiday'} in {country}
            </p>
          </div>
        )}
        <div id="menu" className="ms-auto">
          <div className="flex gap-3">
            <div className="flex items-center gap-3">
              <img src={homeLogo} className="m-auto w-6 cursor-pointer" />
              <img src={notificationLogo} className="m-auto w-6 cursor-pointer" />
            </div>
            {/* Authentication component */}
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};
