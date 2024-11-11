import { useState } from 'react';

import homeLogo from '../../assets/icons/home.png';
import notificationLogo from '../../assets/icons/notification.png';
import calculatorLogo from '../../assets/icons/calculator.png';

import CurrencyCalculator from '../common/currency-calculator';
import Modal from '../modal';
import { Auth } from '../auth';

export const MenuBar = ({ purpose, country }: { purpose: string | undefined; country: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex">
        <div id="languages" className="border-2 outline-0 rounded" style={{ height: 'fit-content' }}>
          <select name="language" id="language">
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        {country != undefined && (
          <div className="mx-4">
            <p>
              {purpose == 'business' ? 'Business' : 'Holiday'} in {country}
            </p>
          </div>
        )}

        <div id="menu" className="ms-auto">
          <div className="flex gap-3">
            <img src={homeLogo} className="m-auto w-4" />
            <img src={notificationLogo} className="m-auto w-4" />

            {/* Currency converter */}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} trigger={<img src={calculatorLogo} className="m-auto w-4" />}>
              <CurrencyCalculator />
            </Modal>

            {/* Authentication component */}
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};
