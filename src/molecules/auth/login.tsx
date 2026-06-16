import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Button from '@atoms/custom-button/button';
import { AuthType } from './types';

interface User {
  email: string | null;
  displayName: string | null;
}

interface LoginProps {
  setIsOpen: (open: boolean) => void;
  setType: (type: AuthType) => void;
  onEmailLoginSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setIsOpen, setType, onEmailLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      onEmailLoginSuccess({
        email: user.email,
        displayName: user.displayName,
      });

      setIsOpen(false);
    } catch (error) {
      setError('Incorrect username/password');
      console.error('Error during email sign-in:', error);
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 rounded-lg w-full"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-3 rounded-lg w-full"
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="text-right">
        <span onClick={() => setType('login')} className="text-blue-500 text-sm cursor-pointer">
          Forgot Password?
        </span>
      </div>

      <Button className="w-full mb-2" onClick={handleEmailLogin}>
        Sign In
      </Button>
    </>
  );
};

export default Login;
