import React from 'react';

interface BrandingCornerProps {
  image: string;
  position?: string;
  offset?: string;
  opacity?: string;
  size?: string;
  scale?: 'contain' | 'cover';
  repeat?: boolean;
  children: React.ReactNode;
}

const getPosition = (pos: string, offset: string) => {
  let positions = pos.split('-');
  let style: React.CSSProperties = {};

  positions.forEach((position) => {
    if (position === 'top' || position === 'bottom') {
      style[position] = offset; // Apply offset for top or bottom
    } else if (position === 'left' || position === 'right') {
      style[position] = offset; // Apply offset for left or right
    } else if (position === 'center') {
      // Centering logic
      if (!positions.includes('top') && !positions.includes('bottom')) {
        style.top = '50%';
        style.transform = 'translateY(-50%)'; // Vertically center
      }
      if (!positions.includes('left') && !positions.includes('right')) {
        style.left = '50%';
        style.transform = style.transform
          ? `${style.transform} translateX(-50%)` // Horizontally center
          : 'translateX(-50%)';
      }
    }
  });

  return style;
};

const BackgroundImageWrapper: React.FC<BrandingCornerProps> = ({
  image,
  position = 'center',
  offset = '0px',
  opacity = '1',
  size = '384px',
  scale = 'contain',
  repeat = false,
  children,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background image in the corner */}
      <div
        className={`absolute bg-${scale} ${repeat ? '' : 'bg-no-repeat'}`}
        style={{
          backgroundImage: `url(${image})`,
          opacity: opacity,
          width: size,
          height: size,
          ...getPosition(position, offset),
        }}
      ></div>

      <div className="overflow-auto h-full w-full flex">
        <span className="m-auto w-full z-10">{children}</span>
      </div>
    </div>
  );
};

export default BackgroundImageWrapper;
