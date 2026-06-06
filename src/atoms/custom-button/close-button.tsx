import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

type CloseProps = {
  theme?: 'light' | 'dark';
  size?: '4' | '6' | '8' | '10';
  className?: string;
  onClick: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | (() => void);
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Close: React.FC<CloseProps> = ({ theme = 'dark', size = '6', className, onClick, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={`
        rounded-full w-${size} h-${size} min-w-[44px] min-h-[44px] flex items-center justify-center
        ${theme === 'light' ? 'bg-slate-200 text-black' : ''}
        ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};

export default Close;
