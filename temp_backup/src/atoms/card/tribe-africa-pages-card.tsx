import React, { ReactNode } from 'react';

interface TribeAfricaPagesCardProps {
  image?: string;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const TribeAfricaPagesCard: React.FC<TribeAfricaPagesCardProps> = ({ image, content, footer, onClick, className }) => {
  return (
    <div
      className={`w-full grid grid-cols-1 ${footer ? 'md:grid-cols-2' : 'md:grid-cols-1'} border border-gray-500 rounded-md p-2 my-4 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className={`flex flex-col md:flex-row md:w-full`}>
        <div className={`${footer ? 'md:w-2/5' : 'md:w-2/5'}`}>
          <img src={image} alt="default" className="w-full aspect-square rounded-md" />
        </div>
        <div className={`md:w-${footer ? '3/5' : 'full'} md:ml-2`}>{content}</div>
      </div>
      {footer && <div className="md:w-1/2 ml-auto flex items-center">{footer}</div>}
    </div>
  );
};

export default TribeAfricaPagesCard;
