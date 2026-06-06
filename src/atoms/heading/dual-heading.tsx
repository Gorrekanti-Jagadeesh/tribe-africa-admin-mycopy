import React from 'react';

interface DualHeadingProps {
  children: string;
  className?: string;
}

const DualHeading: React.FC<DualHeadingProps> = ({ children, className }) => {
  const parts = children.split('*');

  return (
    <h2 className={`font-rufina text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] font-normal ${className}`}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="text-brand-orange">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </h2>
  );
};

export default DualHeading;
