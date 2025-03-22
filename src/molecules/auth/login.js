import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Button from '@atoms/custom-button/button';
const Login = ({ setIsOpen, setType, onEmailLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Initialize Firebase Auth
  const auth = getAuth();
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      onEmailLoginSuccess(user);
      setIsOpen(false);
    } catch (error) {
      setError('Incorrect username/password');
      console.error('Error during email sign-in:', error);
    }
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx('input', {
        type: 'email',
        placeholder: 'Email',
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: 'border p-3 rounded-lg w-full',
      }),
      _jsx('input', {
        type: 'password',
        placeholder: 'Password',
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className: 'border p-3 rounded-lg w-full',
      }),
      error && _jsx('p', { className: 'text-red-500', children: error }),
      _jsx('div', {
        className: 'text-right',
        children: _jsx('span', {
          onClick: () => setType('forgotPassword'),
          className: 'text-blue-500 text-sm cursor-pointer',
          children: 'Forgot Password?',
        }),
      }),
      _jsx(Button, { className: 'w-full mb-2', onClick: handleEmailLogin, children: 'Sign In' }),
    ],
  });
};
export default Login;
