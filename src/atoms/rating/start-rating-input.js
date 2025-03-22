import { jsx as _jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';
const StarRatingInput = forwardRef(({ value, onChange, maxStars = 5 }, ref) => {
  const handleStarClick = (rating) => {
    onChange(rating);
  };
  return _jsx('div', {
    className: 'flex',
    ref: ref,
    children: [...Array(maxStars)].map((_, index) =>
      _jsx(
        'span',
        {
          onClick: () => handleStarClick(index + 1),
          className: `cursor-pointer ${index < value ? 'text-orange-500' : 'text-gray-300'}`,
          children: _jsx('img', { className: 'w-5', src: index < value ? activeStar : inactiveStar }),
        },
        index
      )
    ),
  });
});
export default StarRatingInput;
