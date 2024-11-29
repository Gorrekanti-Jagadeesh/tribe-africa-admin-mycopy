import React, { useState, useRef } from 'react';
import Button from '../../atoms/custom-button/button';

interface FloatingSiblingProps {
  component?: React.ReactNode;
  sibling: React.ReactNode;
  // title?: string;
  // offset: 'parent' | 'screen';
}

export const FloatingSibling: React.FC<FloatingSiblingProps> = ({ component, sibling }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current && cardRef.current.offsetParent) {
      const cardBounds = cardRef.current.getBoundingClientRect();
      const parentBounds = cardRef.current.offsetParent.getBoundingClientRect();
      let style: React.CSSProperties = {};

      // Check available space within the parent container
      const rightSpace = parentBounds.right - cardBounds.right;
      const leftSpace = cardBounds.left - parentBounds.left;

      // Determine dropdown positioning based on available space
      if (rightSpace >= 200) {
        style = { left: '100%', marginLeft: '8px' };
      } else if (leftSpace >= 200) {
        style = { right: '100%', marginRight: '8px' };
      } else {
        style = { left: '50%', transform: 'translateX(-50%)', top: '100%', marginTop: '8px' };
      }

      setPositionStyle(style);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={cardRef}>
      <div>{component}</div>
      {isHovered && (
        <div
          className={`absolute z-20 top-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={positionStyle}
        >
          <Button
            className="absolute flex justify-center items-center -top-2 -right-2 rounded-full w-8 h-8"
            onClick={handleMouseLeave}
          >
            x
          </Button>
          {sibling}
        </div>
      )}
    </div>
  );
};
