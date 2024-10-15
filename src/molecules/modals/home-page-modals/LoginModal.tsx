import React, { useState } from 'react';
import { signInWithGoogle } from '../../../../firebaseDB';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions
import SignupModal from './SignupModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLoginSuccess: (user: any) => void; // Pass the logged-in user back to parent
  onEmailLoginSuccess: (user: any) => void; // Pass the logged-in user back to parent
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onGoogleLoginSuccess, onEmailLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const auth = getAuth(); // Initialize Firebase Auth

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        onGoogleLoginSuccess(user);
        onClose(); // Close the modal after successful login
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      onEmailLoginSuccess(user); // Call the success callback
      onClose(); // Close the modal
    } catch (error) {
      setError('Incorrect username/password'); // Set error message
      console.error('Error during email sign-in:', error);
    }
  };

  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen); // Toggle the signup modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
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
          {error && <p className="text-red-500 mb-2">{error}</p>} {/* Show error message */}
          <button className="bg-purple-600 text-white p-2 rounded w-full" onClick={handleEmailLogin}>
            Sign In
          </button>
          <p className="mt-2 text-center">
            Don't have an account?{' '}
            <span onClick={toggleSignupModal} className="text-blue-500 cursor-pointer">
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
        <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={onClose}>
          Close
        </button>
        {isSignupModalOpen && <SignupModal onClose={toggleSignupModal} />}
      </div>
    </div>
  );
};

export default LoginModal;
