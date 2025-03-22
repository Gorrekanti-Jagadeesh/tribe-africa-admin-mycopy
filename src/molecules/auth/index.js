import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '../modal';
import Login from './login';
import Signup from './signup';
import Button from '@atoms/custom-button/button';
import { signInWithGoogle } from '../../../firebaseDB';
import AuthWrapper from './auth-wrapper';
import { Link } from 'react-router-dom';
const UserPlaceholder = ({ user, handleLogout }) => {
  const [hover, setHover] = useState(false);
  return _jsxs('div', {
    className: 'relative',
    onClick: () => setHover(!hover),
    children: [
      _jsxs('div', {
        className: 'flex items-center gap-2 cursor-pointer',
        children: [
          _jsx('img', {
            src: user?.photoURL
              ? user.photoURL
              : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
            alt: 'Profile',
            className: 'w-8 h-8 rounded-full border border-black',
          }),
          _jsx('span', { className: 'text-gray-700 font-mono', children: '\u25BC' }),
        ],
      }),
      hover &&
        _jsxs('div', {
          className: 'absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10',
          children: [
            _jsx('div', {
              className: 'p-4',
              children: _jsx('h1', { className: 'font-semibold text-gray-800', children: user.displayName }),
            }),
            _jsx('div', {
              className: 'border-t',
              children: _jsx(Link, {
                to: '/user/dashboard',
                className: 'block px-4 py-2 hover:bg-gray-100',
                children: _jsx('button', { className: 'w-full text-left text-violet-500', children: 'Dashboard' }),
              }),
            }),
            _jsx('div', {
              className: 'border-t',
              children: _jsx('button', {
                className: 'w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100',
                onClick: handleLogout,
                children: 'Logout',
              }),
            }),
          ],
        }),
    ],
  });
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
  const handleEmailLoginSuccess = (user) => {
    Cookies.set('emailUser', JSON.stringify(user), { expires: 7 });
    setEmailUser(user);
    setIsLogin(true);
  };
  const handleAuth = (authType) => {
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
  return _jsxs('div', {
    className: 'flex items-center gap-3',
    children: [
      isLogin
        ? _jsx(UserPlaceholder, { user: googleUser ? googleUser : emailUser, handleLogout: handleLogout })
        : _jsxs('div', {
            className: 'flex gap-2',
            children: [
              _jsx('button', {
                className: 'bg-white p-2 rounded hover:bg-orange-500 hover:text-white',
                onClick: () => handleAuth('login'),
                children: 'Login',
              }),
              _jsx(Button, {
                className: 'hidden md:inline-block',
                onClick: () => handleAuth('register'),
                children: 'Sign up',
              }),
            ],
          }),
      _jsx(Modal, {
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        children: _jsx(AuthWrapper, {
          type: type,
          setType: setType,
          handleGoogleLogin: handleGoogleLogin,
          children:
            type == 'login'
              ? _jsx(Login, { setIsOpen: setIsOpen, setType: setType, onEmailLoginSuccess: handleEmailLoginSuccess })
              : _jsx(Signup, { setIsOpen: setIsOpen }),
        }),
      }),
    ],
  });
};
