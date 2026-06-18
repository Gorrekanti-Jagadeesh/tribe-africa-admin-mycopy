import { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '../modal';
import Login from './login';
import Signup from './signup';
import Button from '@atoms/custom-button/button';
import { signInWithGoogle } from '../../../firebaseDB';
import AuthWrapper from './auth-wrapper';
import { Link } from 'react-router-dom';

interface User {
  email: string | null;
  displayName: string | null;
  photoURL?: string;
}

const UserPlaceholder = ({ user, handleLogout }: { user: User; handleLogout: () => void }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative" onClick={() => setHover(!hover)}>
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={
            user?.photoURL
              ? user.photoURL
              : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
          }
          alt="Profile"
          className="w-8 h-8 rounded-full border border-black"
        />
        <span className="text-gray-700 font-mono">▼</span>
      </div>

      {hover && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <div className="p-4">
            <h1 className="font-semibold text-gray-800">{user.displayName}</h1>
          </div>
          <div className="border-t">
            <Link to={'/user/dashboard'} className="block px-4 py-2 hover:bg-gray-100">
              <button className="w-full text-left text-violet-500">Dashboard</button>
            </Link>
          </div>
          <div className="border-t">
            <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Auth = () => {
  const googleUserCookie = Cookies.get('googleUser');
  const emailUserCookie = Cookies.get('emailUser');

  const [googleUser, setGoogleUser] = useState(googleUserCookie ? JSON.parse(googleUserCookie) : null);
  const [emailUser, setEmailUser] = useState(emailUserCookie ? JSON.parse(emailUserCookie) : null);

  const [isLogin, setIsLogin] = useState(googleUser || emailUser);

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        handleEmailLoginSuccess(user);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  // const handleGoogleLoginSuccess = (user: User) => {
  //   Cookies.set('googleUser', JSON.stringify(user), { expires: 7 });
  //   setGoogleUser(user);
  //   setIsLogin(true);
  // };

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
    <div className="flex items-center gap-3">
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
          <Button className="hidden md:inline-block" onClick={() => handleAuth('register')}>
            Sign up
          </Button>
        </div>
      )}

      {/* Modal for Auth forms */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AuthWrapper type={type} setType={setType} handleGoogleLogin={handleGoogleLogin}>
          {type == 'login' ? (
            <Login setIsOpen={setIsOpen} setType={setType} onEmailLoginSuccess={handleEmailLoginSuccess} />
          ) : (
            <Signup setIsOpen={setIsOpen} />
          )}
        </AuthWrapper>
      </Modal>
    </div>
  );
};
