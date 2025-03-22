import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Loading } from '@atoms/common/loading';
import Button from '@atoms/custom-button/button';
import AccommodationCard from '@atoms/card/accomodation-card';
import { fromKebabCase } from '@utils/common';
import { useNavigate } from 'react-router-dom';
const AccomodationScreen = ({ data, error, isLoading, country, category, subCategory }) => {
  const navigate = useNavigate();
  if (isLoading) return _jsx(Loading, {});
  if (error) return _jsx('div', { children: 'Error loading data' });
  if (!data) return _jsx('div', { children: 'Data not loaded yet..' });
  const handleNavigation = () => {
    console.log('Navigating to /form'); // Debug log
    navigate('/form');
  };
  return _jsx('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: _jsxs('div', {
      children: [
        _jsxs('div', {
          className: 'flex mb-4',
          children: [
            _jsx('h1', { className: 'text-4xl font-bold', children: fromKebabCase(subCategory) }),
            _jsx(Button, { className: 'ms-auto', onClick: handleNavigation, children: 'List your accommodation' }),
          ],
        }),
        _jsx('div', {
          className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto',
          children: data.map((item) =>
            _jsx(
              AccommodationCard,
              { data: item, country: country, category: category, subCategory: subCategory },
              item._id
            )
          ),
        }),
      ],
    }),
  });
};
export default AccomodationScreen;
