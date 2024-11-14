import React from 'react';

interface headingProps {
  children: string;
  className?: string;
}

const UnderlineHeading: React.FC<headingProps> = ({ children, className }) => {
  return (
    <h1 className={`flex-grow mb-4 pb-2 border-b-2 w-100 border-orange-500 text-4xl max-w-md ${className}`}>
      {children}
    </h1>
  );
};

export default UnderlineHeading;
