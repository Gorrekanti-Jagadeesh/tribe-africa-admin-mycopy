import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';

export const StarRating: React.FC<{ rating: number | string; className?: string }> = ({ rating, className }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(<img className="w-1/5 md:w-5" key={i} src={i < Number(rating) ? activeStar : inactiveStar} />);
  }
  return (
    <div className="w-5 md:w-fit text-center">
      <p className="md:hidden">{rating}</p>
      <div className={`flex flex-wrap gap-0 md:gap-1 ${className}`}>{stars}</div>
    </div>
  );
};
