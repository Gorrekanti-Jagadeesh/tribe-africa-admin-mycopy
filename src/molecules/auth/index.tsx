import { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '../modal';
import Login from './login';
import Signup from './signup';
import Button from '@atoms/custom-button/button';
import { signInWithGoogle } from '../../../firebaseDB';
import AuthWrapper from './auth-wrapper';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

interface User {
  email: string | null;
  displayName: string | null;
  photoURL?: string;
}

/* ================= USER POPOVER ================= */

const UserPlaceholder = ({ user, handleLogout }: { user: User; handleLogout: () => void }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative" onClick={() => setHover(!hover)}>
      <div className="flex items-center gap-2 cursor-pointer">
        <FaUserCircle className="w-8 h-8 text-gray-400 cursor-pointer" />
      </div>

      {hover && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {/* <div className="p-4">
            <h1 className="font-semibold text-gray-800">
              {user.displayName}
            </h1>
          </div> */}

          <div className="border-b text-sm font-semibold text-gray-800">{user.displayName}</div>

          <div className="border-t">
            <Link to="/user/dashboard" className="block px-4 py-2 hover:bg-gray-100">
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

/* ================= MAIN AUTH COMPONENT ================= */

export const Auth = () => {
  const googleUserCookie = Cookies.get('googleUser');
  const emailUserCookie = Cookies.get('emailUser');

  const [googleUser, setGoogleUser] = useState<User | null>(googleUserCookie ? JSON.parse(googleUserCookie) : null);

  const [emailUser, setEmailUser] = useState<User | null>(emailUserCookie ? JSON.parse(emailUserCookie) : null);

  const user = googleUser || emailUser;
  const isLogin = Boolean(user);

  const [type, setType] = useState<'login' | 'register'>('login');
  const [isOpen, setIsOpen] = useState(false);

  /* ================= LOGIN HANDLERS ================= */

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

  const handleEmailLoginSuccess = (user: User) => {
    Cookies.set('emailUser', JSON.stringify(user), { expires: 7 });
    setEmailUser(user);
  };

  const handleAuth = (authType: 'login' | 'register') => {
    setType(authType);
    setIsOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove('emailUser');
    Cookies.remove('googleUser');
    setGoogleUser(null);
    setEmailUser(null);
  };

  /* ================= UI ================= */

  return (
    <div className="flex items-center gap-3">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex items-center gap-3">
        {isLogin ? (
          <UserPlaceholder user={user as User} handleLogout={handleLogout} />
        ) : (
          <>
            <button className="text-black hover:text-brand-orange px-2 py-2" onClick={() => handleAuth('login')}>
              Login
            </button>

            <Button onClick={() => handleAuth('register')}>Sign up</Button>
          </>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="flex md:hidden items-center gap-3">
        {isLogin ? (
          <UserPlaceholder user={user as User} handleLogout={handleLogout} />
        ) : (
          <button className="text-black hover:text-brand-orange px-2 py-2" onClick={() => handleAuth('login')}>
            Login
          </button>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AuthWrapper type={type} setType={setType} handleGoogleLogin={handleGoogleLogin}>
          {type === 'login' ? (
            <Login setIsOpen={setIsOpen} setType={setType} onEmailLoginSuccess={handleEmailLoginSuccess} />
          ) : (
            <Signup setIsOpen={setIsOpen} />
          )}
        </AuthWrapper>
      </Modal>
    </div>
  );
};
