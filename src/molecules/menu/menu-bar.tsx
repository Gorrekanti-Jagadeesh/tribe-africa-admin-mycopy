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
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {country && (
          <>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              trigger={
                <div className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 cursor-pointer transition-all duration-300">
                  <img src={calculatorLogo} className="w-8 h-8 object-contain" alt="Calculator" />
                </div>
              }
              customClasses="flex items-center justify-center h-screen"
              closeButtonClasses="right-[19%] top-[33%] z-10"
            >
              <CurrencyCalculator />
            </Modal>

            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full border border-gray-200">
              <img
                src={flags[country]}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                alt={country}
              />
              <p className="font-medium text-sm md:text-base text-gray-700">
                {purpose !== 'holiday' ? 'Business' : 'Holiday'} in{' '}
                <span className="font-semibold text-black">{fromKebabCase(country)}</span>
              </p>
            </div>
          </>
        )}

        {/* Home */}
        <div
          onClick={() => navigate('/')}
          className="p-2 rounded-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <img src={homeLogo} className="w-8 h-8 md:w-9 md:h-9 object-contain" alt="Home" />
        </div>

        {/* Notifications */}
        <div
          className="relative p-2 rounded-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/notifications')}
        >
          <img src={notificationLogo} className="w-8 h-8 md:w-9 md:h-9 object-contain" alt="Notifications" />

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-lg">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Right Side Login/Profile */}
      <div className="ml-auto">
        <Auth />
      </div>
    </div>
  );
};
