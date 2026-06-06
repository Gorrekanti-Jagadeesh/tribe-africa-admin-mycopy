import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds === 0) {
      navigate('/');
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4 text-gray-600">Oops! Page Not Found</p>
        <p className="text-xl mt-2 text-gray-500">
          Redirecting you to the{' '}
          <span className="font-semibold text-brand-orange cursor-pointer" onClick={() => navigate('/')}>
            Home Page
          </span>{' '}
          in {seconds} seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFound;
