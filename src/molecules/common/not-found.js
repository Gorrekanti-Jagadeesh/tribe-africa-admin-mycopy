import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
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
  return _jsx('div', {
    className: 'flex items-center justify-center h-screen bg-gray-100',
    children: _jsxs('div', {
      className: 'text-center',
      children: [
        _jsx('h1', { className: 'text-6xl font-bold text-red-500', children: '404' }),
        _jsx('p', { className: 'text-2xl mt-4 text-gray-600', children: 'Oops! Page Not Found' }),
        _jsxs('p', {
          className: 'text-xl mt-2 text-gray-500',
          children: [
            'Redirecting you to the',
            ' ',
            _jsx('span', {
              className: 'font-semibold text-orange-500 cursor-pointer',
              onClick: () => navigate('/'),
              children: 'Home Page',
            }),
            ' ',
            'in ',
            seconds,
            ' seconds...',
          ],
        }),
      ],
    }),
  });
};
export default NotFound;
