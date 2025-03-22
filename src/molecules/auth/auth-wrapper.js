import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import googleIcon from '@assets/icons/google-color.svg';
import brandImage from '@assets/brand-tribe-africa.png';
const AuthWrapper = ({ type, setType, handleGoogleLogin, children }) => {
  return _jsx('div', {
    className: 'flex items-center justify-center bg-white p-2 md:p-10',
    children: _jsxs('div', {
      className: 'flex gap-10 rounded-lg overflow-hidden md:px-10',
      children: [
        _jsx('div', {
          className: 'hidden md:flex flex-1 justify-center items-center',
          children: _jsx('img', { src: brandImage, alt: 'Africa Word Cloud', className: 'object-contain' }),
        }),
        _jsxs('div', {
          className: 'flex-1 flex flex-col gap-4 p-2 md:p-10 max-w-96',
          children: [
            _jsxs('h2', {
              className: 'text-2xl font-bold',
              children: ['Welcome ', type == 'login' ? 'Back' : '', '\uD83D\uDC4B'],
            }),
            _jsx('p', {
              className: 'text-gray-600 mb-6',
              children:
                "Your gateway to experiencing Africa's breathtaking beauty and limitless business opportunities. Begin your journey with us. Africa awaits you!",
            }),
            children,
            _jsxs('div', {
              className: 'flex items-center my-6',
              children: [
                _jsx('hr', { className: 'flex-grow border-t border-gray-300' }),
                _jsx('span', { className: 'mx-4 text-gray-500', children: 'Or' }),
                _jsx('hr', { className: 'flex-grow border-t border-gray-300' }),
              ],
            }),
            _jsxs('button', {
              className: 'flex items-center justify-center bg-gray-200 p-2 rounded-lg w-full',
              onClick: handleGoogleLogin,
              children: [
                _jsx('img', { src: googleIcon, alt: 'Google Icon', className: 'w-5 h-5 mr-2' }),
                'Sign in with Google',
              ],
            }),
            _jsx('div', {
              className: 'text-center mt-6',
              children:
                type == 'login'
                  ? _jsx(_Fragment, {
                      children: _jsxs('p', {
                        className: 'text-sm',
                        children: [
                          "Don't you have an account?",
                          ' ',
                          _jsx('span', {
                            onClick: () => setType('register'),
                            className: 'text-blue-500 cursor-pointer',
                            children: 'Sign up',
                          }),
                        ],
                      }),
                    })
                  : _jsx(_Fragment, {
                      children: _jsxs('p', {
                        className: 'text-sm',
                        children: [
                          'Already have an account?',
                          ' ',
                          _jsx('span', {
                            onClick: () => setType('login'),
                            className: 'text-blue-500 cursor-pointer',
                            children: 'Sign In',
                          }),
                        ],
                      }),
                    }),
            }),
          ],
        }),
      ],
    }),
  });
};
export default AuthWrapper;
