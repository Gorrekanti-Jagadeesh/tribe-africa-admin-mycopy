import { FaStar } from 'react-icons/fa';
import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';

export const StarRating: React.FC<{ rating: string }> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<img className="w-5" src={i < parseInt(rating) ? activeStar : inactiveStar} />);
  }
  return <div className="flex gap-1 ms-auto">{stars}</div>;
};
