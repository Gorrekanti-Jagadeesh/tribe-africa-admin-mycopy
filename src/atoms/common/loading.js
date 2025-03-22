import { jsx as _jsx } from 'react/jsx-runtime';
export const Loading = () => {
  return _jsx('div', {
    className: 'flex items-center justify-center',
    children: _jsx('div', {
      className: 'animate-spin rounded-full h-8 w-8 border-2 border-t-orange-500 border-b-gray-400',
    }),
  });
};
