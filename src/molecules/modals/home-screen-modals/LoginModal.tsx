import React from 'react';
import { signInWithGoogle } from '../../../../firebaseDB';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void; // Pass the logged-in user back to parent
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  // Function to handle Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      // Pass the user info to the parent component

      const user = await signInWithGoogle();
      onLoginSuccess(user);
      console.log(user);

      // Close the modal after successful login
      onClose();
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <button className="bg-red-500 text-white p-2 rounded mb-4 w-full" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
