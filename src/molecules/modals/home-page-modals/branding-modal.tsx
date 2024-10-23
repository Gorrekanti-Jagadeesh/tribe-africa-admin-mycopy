import React from 'react';
import branding from '../../../assets/branding.png';

interface BrandingModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  trigger?: React.ReactNode;
  modalContent: React.ReactNode;
}

const BrandingModal: React.FC<BrandingModalProps> = ({ isOpen, setIsOpen, trigger, modalContent }) => {
  // const [isOpen, setIsOpen] = useState(open);

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
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className="grid bg-gray-900 text-white rounded-md shadow-lg border-2 border-orange-500 relative w-full max-w-5xl h-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal elements */}
              <div className="flex flex-col">
                {/* Close Modal */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white rounded-full p-2 px-4 bg-slate-800 absolute top-4 right-4 text-xl"
                  style={{ zIndex: 2 }}
                >
                  X
                </button>

                {/* Background image in the corner */}
                <div
                  className="absolute size-96 bg-no-repeat bg-bottom-right grayscale opacity-30"
                  style={{
                    bottom: '-100px',
                    right: '-40px',
                    backgroundImage: `url(${branding})`,
                    backgroundSize: 'contain',
                    zIndex: 0,
                  }}
                ></div>
              </div>

              {/* Modal content */}
              <div className="absolute overflow-auto h-full w-full flex">
                <span className="m-auto w-full">{modalContent}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingModal;
