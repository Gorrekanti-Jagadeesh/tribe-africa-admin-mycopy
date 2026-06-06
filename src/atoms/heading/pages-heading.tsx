import React from 'react';
// import ChevronBackSvg from '@assets/svgs/io-chevron-back-svg';

interface headingProps {
  children: string;
  className?: string;
}

const PagesHeading: React.FC<headingProps> = ({ children, className }) => {
  return (
    <h1 className={`flex-grow mb-4 pb-2 border-b-2 w-100 border-brand-orange text-4xl max-w-md ${className}`}>
      {children}
    </h1>
  );
};

export default PagesHeading;
