import React from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  customClasses?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, trigger, customClasses, children }) => {
  return (
    <div className="relative">
      {/* Trigger Button */}
      {trigger && (
        <div onClick={() => setIsOpen(true)} className="cursor-pointer inline-block z-0">
          {trigger}
        </div>
      )}

      {/* Modal Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-50 p-4 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className={`grid shadow-lg relative max-w-5xl mx-auto overflow-hidden px-4 ${customClasses}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="text-white rounded-full p-2 px-4 bg-slate-800 w-fit ms-auto my-4 text-xl"
              style={{ zIndex: 2 }}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
