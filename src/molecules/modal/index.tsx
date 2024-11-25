import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose as close } from '@fortawesome/free-solid-svg-icons';

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
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-50 p-4 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className={`grid relative max-w-5xl mx-auto max-h-full overflow-auto ${customClasses}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-2 right-2 text-white rounded-full p-1 px-2.5 bg-slate-800 ${closeButtonClasses}`}
              style={{ zIndex: 2 }}
            >
              <FontAwesomeIcon icon={close} />
            </button>
            <span className="z-0">{children}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
