import { useState } from 'react';
import homeLogo from '../../assets/home.png';
import notificationLogo from '../../assets/notification.png';
import LoginModal from '../modals/home-page-modals/LoginModal';
import ProfileModal from '../modals/home-page-modals/ProfileModal';
import Cookies from 'js-cookie';
import SignupModal from '../modals/home-page-modals/SignupModal';

interface User {
  email: string | null;
  displayName: string | null;
}
export const MenuBar = () => {
  const googleUserCookie = Cookies.get('googleUser');
  const [googleUser, setGoogleUser] = useState(googleUserCookie ? JSON.parse(googleUserCookie) : null);

  const emailUserCookie = Cookies.get('emailUser');
  const [emailUser, setEmailUser] = useState(emailUserCookie ? JSON.parse(emailUserCookie) : null);

  const [isLogin, setIsLogin] = useState(googleUser || emailUser);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModal(!isLoginModal);
  };

  const toggleProfileModal = () => {
    setIsProfileModal(!isProfileModal);
  };

  const toggleSignupModal = () => {
    setIsSignupModal(!isSignupModal);
  };

  const handleGoogleLoginSuccess = (user: User) => {
    Cookies.set('googleUser', JSON.stringify(user), { expires: 7 });
    setGoogleUser(user);
    setIsLogin(true);
  };

  const handleEmailLoginSuccess = (user: User) => {
    Cookies.set('emailUser', JSON.stringify(user), { expires: 7 });
    setEmailUser(user);
    setIsLogin(true);
  };

  const handleLogoutSuccess = () => {
    Cookies.remove('emailUser');
    Cookies.remove('googleUser');
    setGoogleUser(false);
    setEmailUser(false);
    setIsLogin(false);
  };

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

        <div id="menu" className="ms-auto">
          <div className="flex gap-3">
            <img src={homeLogo} className="m-auto" style={{ width: '14px', height: 'fit-content' }} />
            <img src={notificationLogo} className="m-auto" style={{ width: '14px', height: 'fit-content' }} />

            {isLogin ? (
              googleUser ? (
                <div className="flex items-center gap-2" onClick={toggleProfileModal}>
                  <img
                    src={
                      googleUser?.photoURL
                        ? googleUser.photoURL
                        : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Hi, {googleUser.displayName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2" onClick={toggleProfileModal}>
                  <img
                    src={
                      emailUser?.photoURL
                        ? emailUser?.photoURL
                        : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Hi, User</span>
                </div>
              )
            ) : (
              <div className="flex gap-2">
                <button
                  className="bg-white p-2 rounded hover:bg-orange-500 hover:text-white"
                  onClick={toggleLoginModal}
                >
                  Login
                </button>
                <button
                  className="bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black"
                  onClick={toggleSignupModal}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModal}
        onClose={toggleLoginModal}
        onGoogleLoginSuccess={handleGoogleLoginSuccess}
        onEmailLoginSuccess={handleEmailLoginSuccess}
      />
      <ProfileModal isOpen={isProfileModal} onClose={toggleProfileModal} onLogout={handleLogoutSuccess} />
      {isSignupModal && <SignupModal onClose={toggleSignupModal} />}
    </>
  );
};
