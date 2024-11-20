import { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '../modal';
import Login from './login';
import Signup from './signup';
import Button from '../../atoms/custom-button/button';

interface User {
  email: string | null;
  displayName: string | null;
  photoURL?: string;
}

const UserPlaceholder = ({ user, handleLogout }: { user: User; handleLogout: () => void }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="flex items-center gap-2" onClick={() => console.log('clicked')}>
        <img
          src={
            user?.photoURL
              ? user.photoURL
              : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
          }
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span>Hi, {user.displayName}</span>
      </div>
      <div className={`absolute right-0 z-10 ${hover ? 'visible' : 'invisible'}`}>
        <button className="bg-red-500 text-white p-2 px-4 rounded mb-4 w-full" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export const Auth = () => {
  const googleUserCookie = Cookies.get('googleUser');
  const emailUserCookie = Cookies.get('emailUser');

  const [googleUser, setGoogleUser] = useState(googleUserCookie ? JSON.parse(googleUserCookie) : null);
  const [emailUser, setEmailUser] = useState(emailUserCookie ? JSON.parse(emailUserCookie) : null);

  const [isLogin, setIsLogin] = useState(googleUser || emailUser);

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

  const handleAuth = (authType: string) => {
    setType(authType);
    setIsOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove('emailUser');
    Cookies.remove('googleUser');
    setGoogleUser(false);
    setEmailUser(false);
    setIsLogin(false);
  };

  const [type, setType] = useState('login');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center">
      {isLogin ? (
        <UserPlaceholder user={googleUser ? googleUser : emailUser} handleLogout={handleLogout} />
      ) : (
        <div className="flex gap-2">
          <button
            className="bg-white p-2 rounded hover:bg-orange-500 hover:text-white"
            onClick={() => handleAuth('login')}
          >
            Login
          </button>
          <Button onClick={() => handleAuth('register')}>Sign up</Button>
        </div>
      )}

      {/* Modal for Auth forms */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {type == 'login' ? (
          <Login
            setIsOpen={setIsOpen}
            setType={setType}
            onGoogleLoginSuccess={handleGoogleLoginSuccess}
            onEmailLoginSuccess={handleEmailLoginSuccess}
          />
        ) : (
          <Signup setIsOpen={setIsOpen} />
        )}
      </Modal>
    </div>
  );
};
