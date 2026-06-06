import React from 'react';

interface headingProps {
  children: string;
  className?: string;
  borderWidth?:
    | 'w-1/2'
    | 'w-1/3'
    | 'w-2/3'
    | 'w-1/4'
    | 'w-2/4'
    | 'w-3/4'
    | 'w-1/5'
    | 'w-2/5'
    | 'w-3/5'
    | 'w-4/5'
    | 'w-full';
}

const UnderlineHeading: React.FC<headingProps> = ({ children, className, borderWidth = 'w-3/4' }) => {
  return (
    <div>
      <h1 className={`flex-grow mb-4 pb-2 text-3xl md:text-4xl font-poppins font-normal ${className}`}>{children}</h1>
      <div className={`border-b-2 border-brand-orange -mt-6 ${borderWidth}`} />
    </div>
  );
};

export default UnderlineHeading;
