import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface close {
  theme?: string;
  size?: string;
  className?: string;
  onClick: () => void;
}

const Close: React.FC<close> = ({ theme = 'dark', size = '6', className, onClick }) => {
  return (
    <button
      className={`
        rounded-full w-${size} h-${size}
        ${theme == 'light' ? 'bg-slate-200 text-black ' : ''}
        ${theme == 'dark' ? 'bg-gray-800 text-white ' : ''}
        ${className}
        `}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};

export default Close;
