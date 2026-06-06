import { useState, useEffect } from 'react';
import homeLogo from '@assets/icons/common/home.svg';
import notificationLogo from '@assets/icons/common/notifications.svg';
import calculatorLogo from '@assets/icons/common/calculator.svg';
import CurrencyCalculator from '../common/currency-calculator';
import Modal from '../modal';
import { Auth } from '../auth';
import { flags } from '../../data';
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
      if (!auth.currentUser) return;
      const notificationsSnapshot = await getDocs(collection(db, 'notifications'));
      const notificationData: Approval[] = [];
      notificationsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userid === auth.currentUser?.uid) {
          notificationData.push({ read: data.read || false });
        }
      });
      setNotifications(notificationData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) fetchNotifications();
  }, [auth.currentUser]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    /* Figma: Frame 41591, 1310×51 utility bar */
    <div className="flex items-center h-[51px]">
      {/* Country + purpose badge (when on country pages) */}
      {country && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={
            /* Calculator icon — Figma: 46×50 */
            <img src={calculatorLogo} className="w-[46px] h-[50px] cursor-pointer mx-2 object-contain" />
          }
          customClasses="flex items-center justify-center h-screen"
          closeButtonClasses="right-[19%] top-[33%] z-10"
        >
          <CurrencyCalculator />
        </Modal>
      )}

      {country != undefined && (
        <div className="mx-3 flex gap-2 items-center">
          <img src={flags[country]} className="w-[49px] h-[49px] rounded-full object-cover border border-gray-300" />
          <p className="font-poppins font-medium text-xl">
            {purpose !== 'holiday' ? 'Business' : 'Holiday'} in {fromKebabCase(country)}
          </p>
        </div>
      )}

      {/* Right-side icons + auth */}
      <div id="menu" className="ms-auto flex items-center gap-3">
        {/* Home icon — Figma: 38×38 */}
        <img
          src={homeLogo}
          className="w-[38px] h-[38px] cursor-pointer object-contain"
          onClick={() => navigate('/')}
          alt="Home"
        />
        {/* Notification icon — Figma: 33×41 */}
        <div className="relative">
          <img
            src={notificationLogo}
            className="w-[33px] h-[41px] cursor-pointer object-contain"
            onClick={() => navigate('/notifications')}
            alt="Notifications"
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-poppins">
              {unreadCount}
            </span>
          )}
        </div>
        {/* Auth component */}
        <Auth />
      </div>
    </div>
  );
};
