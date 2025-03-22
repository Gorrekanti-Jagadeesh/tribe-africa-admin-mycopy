import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
const TribeAfricaPagesDetailsScreen = ({ tribeAfricaPageDetails }) => {
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsx('h4', { children: tribeAfricaPageDetails.department }),
      _jsx(TribeAfricaPagesCard, {
        image: tribeAfricaPageDetails.imageUrl,
        content: _jsx('div', { children: _jsx('p', { children: tribeAfricaPageDetails.description }) }),
      }),
      _jsx('div', {
        className: 'my-4',
        children: _jsx('div', {
          className: 'flex my-4',
          children: _jsx('h2', { className: 'text-3xl font-semibold', children: 'Reviews' }),
        }),
      }),
    ],
  });
};
export default TribeAfricaPagesDetailsScreen;
