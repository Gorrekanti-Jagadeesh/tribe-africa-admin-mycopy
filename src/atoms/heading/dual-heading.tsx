import React from 'react';

interface DualHeadingProps {
  children: string;
  className?: string;
}

const DualHeading: React.FC<DualHeadingProps> = ({ children, className }) => {
  const parts = children.split('*');

  return (
    <h2 className={`text-xl md:text-4xl ${className}`}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="font-serif text-orange-500">
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
