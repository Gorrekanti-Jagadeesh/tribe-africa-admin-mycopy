import React, { useState } from 'react';

interface BrandingModalProps {
  Trigger: any;
  ModalContent: any;
}

const BrandingModal: React.FC<BrandingModalProps> = ({ Trigger, ModalContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10">
      {/* Trigger Button */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer inline-block">
        {Trigger}
      </div>

      {/* Modal Background Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)}>
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className="grid bg-gray-900 text-white rounded-md shadow-lg border-2 border-orange-500 relative w-full max-w-4xl h-full overflow-hidden"
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
                    backgroundImage: `url('https://s3-alpha-sig.figma.com/img/c10d/31ac/f6510f49a600ee4012f68d99c9b2f87d?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KasIX6eAigMBROC-yKTXZ9zDphORdFr6EZ8QGQX4RwWXZ-1hZu1fbwaUx3x2ELmyQ6jO86Ok06SBqi3kb14EUElQagnnZ7DuWYxKdrWo2ftFKjdu5WcWxE1fXf6u4un6FCA4svzAyyqouX8GLdLJwt3qcJVugegkw~kly3B9ndj6aTyKBRfk82RAR7NS2pSpZtFCH7~lyZXiern4ULPo4kzgbiRjk9nyDQMRyPdVhrkqFy1RqtqICIQNPmbCo1xQmuZ9lcRAklvQITGVvb~EzPI8m2z-OZXkJseVP9yjGl6OdZNGrQJg1WXywshEaSztNp7731UUgFBGP1YC0kKoPQ__')`,
                    backgroundSize: 'contain',
                    zIndex: 0,
                  }}
                ></div>
              </div>

              {/* Modal content */}
              <div className="absolute overflow-auto h-full w-full flex">
                <span className="m-auto w-full">{ModalContent}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingModal;
