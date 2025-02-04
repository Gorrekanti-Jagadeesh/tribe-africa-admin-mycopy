import activeStar from '../../assets/icons/seven-pointed-star-fill.svg';
import inactiveStar from '../../assets/icons/seven-pointed-star-stroke.svg';

export const StarRating: React.FC<{
  rating: number | string;
  className?: string;
  type?: 'brief' | 'compact' | 'default';
}> = ({ rating, className, type = 'default' }) => {
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
    stars.push(<img className={styling.star[type]} key={i} src={i < Number(rating) ? activeStar : inactiveStar} />);
  }
  return (
    <div className={styling.container[type]}>
      <p className={styling.text[type]}>{rating}</p>
      <div className={`${styling.starsContainer[type]} ${className}`}>{stars}</div>
    </div>
  );
};
