import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';
export const StarRating = ({ rating, className, type = 'default' }) => {
  const stars = [];
  const styling = {
    star: {
      brief: 'w-5',
      compact: 'w-1/5',
      default: 'w-1/5 md:w-5',
    },
    text: {
      brief: 'hidden',
      compact: '',
      default: 'md:hidden',
    },
    container: {
      brief: 'w-fit text-center',
      compact: 'w-5 text-center',
      default: 'w-5 md:w-fit text-center',
    },
    starsContainer: {
      brief: 'flex flex-wrap gap-0 gap-1',
      compact: 'flex flex-wrap gap-0',
      default: 'flex flex-wrap gap-0 md:gap-1',
    },
  };
  for (let i = 0; i < 5; i++) {
    stars.push(_jsx('img', { className: styling.star[type], src: i < Number(rating) ? activeStar : inactiveStar }, i));
  }
  return _jsxs('div', {
    className: styling.container[type],
    children: [
      _jsx('p', { className: styling.text[type], children: rating }),
      _jsx('div', { className: `${styling.starsContainer[type]} ${className}`, children: stars }),
    ],
  });
};
