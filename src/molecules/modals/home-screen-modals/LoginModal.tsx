import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <button className="bg-red-500 text-white p-2 rounded mb-4 w-full" onClick={() => alert('Login with Google')}>
          Login with Google
        </button>
        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={() => alert('Login with Email')}>
          Login with Email
        </button>
        <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
