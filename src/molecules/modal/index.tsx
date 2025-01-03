import React, { useEffect } from 'react';
import Close from '@atoms/custom-button/close-button';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  containerClasses?: string;
  customClasses?: string;
  closeButtonClasses?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  containerClasses,
  trigger,
  customClasses,
  closeButtonClasses,
  children,
}) => {
  return (
    <div className={`inline-block ${containerClasses}`}>
      {/* Trigger Button */}
      {trigger && (
        <span onClick={() => setIsOpen(true)} className="cursor-pointer">
          {trigger}
        </span>
      )}

      {/* Modal Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-50 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div className="w-full h-full py-4 overflow-auto bg-transparent">
            <div className={`relative max-w-5xl m-auto ${customClasses}`} onClick={(e) => e.stopPropagation()}>
              <Close
                className={`m-2 absolute top-0 right-0 ${closeButtonClasses}`}
                size={`8`}
                theme="light"
                onClick={() => setIsOpen(false)}
              />
              <span className="z-0">{children}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
