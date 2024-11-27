import { useState } from 'react';
import homeLogo from '../../assets/icons/home.png';
import notificationLogo from '../../assets/icons/notification.png';
import calculatorLogo from '../../assets/icons/calculator.png';
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
        <div id="languages" className="border-2 outline-0 rounded hidden md:block" style={{ height: 'fit-content' }}>
          <Dropdown
            iconVisible={true}
            placeholderText="Language"
            searchable={false}
            options={Languages}
            action={handleLanguageChange}
            buttonStyles={'md:w-32 '}
          />
        </div>

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={<img src={calculatorLogo} className="m-auto w-6 md:hidden" />}
        >
          <CurrencyCalculator />
        </Modal>

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
              <img
                src={calculatorLogo}
                className="w-6 cursor-pointer hidden md:block"
                onClick={() => setIsOpen(true)}
              />
            </div>
            {/* Authentication component */}
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};
