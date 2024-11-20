import React from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  containerClasses?: string;
  customClasses?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, containerClasses, trigger, customClasses, children }) => {
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
              className="text-white rounded-full p-2 px-4 bg-slate-800 w-fit ms-auto mb-4 text-xl"
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
