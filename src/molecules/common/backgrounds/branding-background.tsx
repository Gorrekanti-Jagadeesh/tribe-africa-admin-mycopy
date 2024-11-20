import React from 'react';
import branding from '@assets/branding.png';

interface BrandingCornerProps {
  children: React.ReactNode;
}

const BrandingCorner: React.FC<BrandingCornerProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background image in the corner */}
      <div
        className="absolute -bottom-24 -right-10 size-96 bg-no-repeat bg-bottom-right grayscale opacity-30 bg-contain"
        style={{
          backgroundImage: `url(${branding})`,
        }}
      ></div>

      <div className="overflow-auto h-fit w-full flex py-4">
        <span className="m-auto w-full z-10">{children}</span>
      </div>
    </div>
  );
};

export default BrandingCorner;
