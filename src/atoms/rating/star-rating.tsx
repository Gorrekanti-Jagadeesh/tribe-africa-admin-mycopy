import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';

export const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<img className="w-5" key={i} src={i < rating ? activeStar : inactiveStar} />);
  }
  return <div className={`flex flex-wrap gap-1 ${className}`}>{stars}</div>;
};
