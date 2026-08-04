import TAlogo from '../../assets/tribe-africa-logo.png';

export const TribeAfrica = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <img
      src={TAlogo}
      alt="err"
      className={`h-4 inline-block align-middle ${className}`}
      style={{
        ...style,
        bottom: '2px',
      }}
    />
  );
};
