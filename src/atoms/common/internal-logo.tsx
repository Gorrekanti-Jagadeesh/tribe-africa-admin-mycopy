import TAlogo from '../../assets/tribe-africa-logo.png';

export const TribeAfrica = ({ className, style }: { className?: string; style?: any }) => {
  return (
    <img
      src={TAlogo}
      alt=""
      className={` max-h-4 m-0 inline-block relative ${className}`}
      style={{
        ...style,
        bottom: '2px',
      }}
    />
  );
};
