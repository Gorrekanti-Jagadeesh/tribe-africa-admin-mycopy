import { useState, useEffect } from 'react';
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
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebaseDB';
import { useNavigate } from 'react-router-dom';

interface Approval {
  read?: boolean;
}

export const MenuBar = ({ purpose, country }: { purpose: string | undefined; country: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Approval[]>([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      if (!auth.currentUser) {
        console.log('User is not authenticated');
        return;
      }

      // Fetch notifications from single collection
      const notificationsSnapshot = await getDocs(collection(db, 'notifications'));
      const notificationData: Approval[] = [];

      notificationsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userid === auth.currentUser?.uid) {
          notificationData.push({
            read: data.read || false,
          });
        }
      });

      setNotifications(notificationData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchNotifications();
    }
  }, [auth.currentUser]);

  const handleLanguageChange = (selectedOption: string) => {
    i18n.changeLanguage(selectedOption);
  };

  // Total unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

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
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={<img src={calculatorLogo} className="m-auto w-6" />}
            customClasses="flex items-center justify-center h-screen"
            closeButtonClasses="right-[19%] top-[33%] z-10"
          >
            <CurrencyCalculator />
          </Modal>
        )}

        {country != undefined && (
          <div className="mx-4 flex gap-2 justify-center align-middle items-center">
            <img src={flags[country]} className="w-9 aspect-square rounded-full object-cover border border-gray-300" />
            <p>
              {purpose != 'holiday' ? 'Business' : 'Holiday'} in {fromKebabCase(country)}
            </p>
          </div>
        )}
        <div id="menu" className="ms-auto">
          <div className="flex gap-3">
            <div className="flex items-center gap-3">
              <img src={homeLogo} className="m-auto w-6 cursor-pointer" />
              <div className="relative">
                <img
                  src={notificationLogo}
                  className="m-auto w-6 cursor-pointer"
                  onClick={() => navigate('/notifications')}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
            {/* Authentication component */}
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};
