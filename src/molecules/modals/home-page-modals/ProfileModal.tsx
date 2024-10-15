import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebaseDB';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Call the logout handler in parent
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <button className="bg-red-500 text-white p-2 rounded mb-4 w-full" onClick={handleLogout}>
          Logout
        </button>
        <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
