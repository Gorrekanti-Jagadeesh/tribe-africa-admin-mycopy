import React from 'react';

import googleIcon from '@assets/icons/google-color.svg';
import brandImage from '@assets/brand-tribe-africa.png';

interface AuthProps {
  type: string;
  setType: (type: string) => void;
  handleGoogleLogin: () => void;
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthProps> = ({ type, setType, handleGoogleLogin, children }) => {
  return (
    <div className="flex items-center justify-center bg-white p-2 md:p-10">
      <div className="flex gap-10 rounded-[10px] overflow-hidden md:px-10">
        {/* Left side - Word cloud */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img src={brandImage} alt="Africa Word Cloud" className="object-contain" />
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex flex-col gap-4 p-2 md:p-10 max-w-96">
          <h2 className="text-2xl font-bold">Welcome {type == 'login' ? 'Back' : ''}👋</h2>
          <p className="text-gray-600 mb-6">
            Your gateway to experiencing Africa's breathtaking beauty and limitless business opportunities. Begin your
            journey with us. Africa awaits you!
          </p>
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
            <img src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <div className="text-center mt-6">
            {type == 'login' ? (
              <>
                <p className="text-sm">
                  Don't you have an account?{' '}
                  <span onClick={() => setType('register')} className="text-blue-500 cursor-pointer">
                    Sign up
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-sm">
                  Already have an account?{' '}
                  <span onClick={() => setType('login')} className="text-blue-500 cursor-pointer">
                    Sign In
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
