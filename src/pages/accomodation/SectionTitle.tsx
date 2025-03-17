import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative w-fit ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 relative">
        {children}
        {/* <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500 rounded-full" /> */}
      </h3>
    </div>
  );
};

export default SectionTitle;
