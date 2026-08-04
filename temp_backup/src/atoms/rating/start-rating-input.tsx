import { forwardRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';

interface StarRatingInputProps extends ControllerRenderProps {
  maxStars?: number;
}

const StarRatingInput = forwardRef<HTMLDivElement, StarRatingInputProps>(({ value, onChange, maxStars = 5 }, ref) => {
  const handleStarClick = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="flex" ref={ref}>
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          className={`cursor-pointer ${index < value ? 'text-orange-500' : 'text-gray-300'}`}
        >
          <img className="w-5" src={index < value ? activeStar : inactiveStar} />
        </span>
      ))}
    </div>
  );
});

export default StarRatingInput;
