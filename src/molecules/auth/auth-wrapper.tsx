import React, { Dispatch, SetStateAction } from 'react';
import googleIcon from '@assets/icons/google-color.svg';
import brandImage from '@assets/brand-tribe-africa.png';
import { AuthType } from './types';

interface AuthProps {
  type: AuthType;
  setType: Dispatch<SetStateAction<AuthType>>;
  handleGoogleLogin: () => void;
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthProps> = ({ type, setType, handleGoogleLogin, children }) => {
  return (
    <div className="flex items-center justify-center bg-white p-2 md:p-10">
      <div className="flex gap-10 rounded-[10px] overflow-hidden md:px-10">
        {/* LEFT */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img src={brandImage} alt="Brand" className="object-contain" />
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col gap-4 p-2 md:p-10 max-w-96">
          <h2 className="text-2xl font-bold">Welcome {type === 'login' ? 'Back' : ''} 👋</h2>

          <p className="text-gray-600 mb-6">Your gateway to experiences and opportunities.</p>

          {children}

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            className="flex items-center justify-center bg-gray-200 p-2 rounded-lg w-full"
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <div className="text-center mt-6">
            {type === 'login' ? (
              <p className="text-sm">
                Don’t have an account?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={() => setType('register')}>
                  Sign up
                </span>
              </p>
            ) : (
              <p className="text-sm">
                Already have an account?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={() => setType('login')}>
                  Sign in
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
