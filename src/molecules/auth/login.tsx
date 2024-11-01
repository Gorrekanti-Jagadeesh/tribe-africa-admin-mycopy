import React, { useState } from 'react';
import { signInWithGoogle } from '../../../firebaseDB';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions

interface User {
  email: string | null;
  displayName: string | null;
}
interface LoginProps {
  setIsOpen: (open: boolean) => void;
  setType: (type: string) => void;
  onGoogleLoginSuccess: (user: User) => void;
  onEmailLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setIsOpen, setType, onGoogleLoginSuccess, onEmailLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize Firebase Auth
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        onGoogleLoginSuccess(user);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

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

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-semibold mb-4">Welcome Back</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        {/* Show error message */}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="bg-purple-600 text-white p-2 rounded w-full" onClick={handleEmailLogin}>
          Sign In
        </button>
        <p className="mt-2 text-center">
          Don't have an account?{' '}
          <span onClick={() => setType('register')} className="text-blue-500 cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">Or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className="mt-4">
        <button className="bg-red-500 text-white p-2 rounded mb-2 w-full" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>
      <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={() => setIsOpen(false)}>
        Close
      </button>
    </div>
  );
};

export default Login;
