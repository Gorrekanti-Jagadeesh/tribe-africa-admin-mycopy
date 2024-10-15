import { useState } from 'react';
import africaLogo from '../../assets/logo.png';
import homeLogo from '../../assets/home.png';
import notificationLogo from '../../assets/notification.png';
import LoginModal from '../modals/home-page-modals/LoginModal';
import ProfileModal from '../modals/home-page-modals/ProfileModal';
import Cookies from 'js-cookie';
import SignupModal from '../modals/home-page-modals/SignupModal';

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

  const handleGoogleLoginSuccess = (user: any) => {
    Cookies.set('googleUser', JSON.stringify(user), { expires: 7 }); // Store user object instead of just access token
    setGoogleUser(user);
    setIsLogin(true);
  };

  const handleEmailLoginSuccess = (user: any) => {
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

const HoverNavLink = ({ id, title }: { id: string; title: string }) => (
  <div id={id} className="m-auto cursor-pointer group">
    <span className="flex">
      {title}
      <svg
        className="w-2.5 h-2.5 ms-3 m-auto"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg>
    </span>
    <div className="absolute left-0 p-2 mt-1 bg-white border border-gray-200 rounded invisible group-hover:visible transition-opacity">
      This is the hidden content that appears on hover. This is the hidden content that appears on hover. This is the
      hidden content that appears on hover. This is the hidden content that appears on hover. This is the hidden content
      that appears on hover. This is the hidden content that appears on hover.
    </div>
  </div>
);

const Navbar = () => {
  return (
    <div className="grid gap-2 m-2">
      <div>
        <MenuBar />
      </div>
      <div className="hidden text-center border-2 rounded-lg relative md:flex">
        <HoverNavLink id="getting-there" title="Getting there" />
        <HoverNavLink id="discover" title="Discover" />
        <HoverNavLink id="events" title="Events" />
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '150px' }} />
        </div>
        <HoverNavLink id="institute-collaboration" title="Peace & Prosperity Institute" />
        <div id="blog" className="m-auto cursor-pointer">
          <span>Blog</span>
        </div>
        <div id="contact" className="m-auto cursor-pointer">
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
