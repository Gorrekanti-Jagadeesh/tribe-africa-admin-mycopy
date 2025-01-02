import { useState } from 'react';
import useScreenWidth from '@hooks/useScreenWidth';
import Modal from '@molecules/modal';
import { sanityImageUrlBuilder } from '@api/index';

interface CardDataProps {
  image: string;
  title?: string;
  // isOverlay?: boolean;
  description?: string;
  onClick?: () => void;
}

interface OverLayCardProps {
  data: CardDataProps;
}

const OverLayCard: React.FC<OverLayCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useScreenWidth();
  const handleClick = () => {
    if (screenWidth < 768 && data.description != undefined) {
      setIsOpen(true);
    }
  };

  return (
    <div>
      {/* Card content */}
      <div
        className="w-full inline-block cursor-pointer group relative"
        onClick={data.onClick ? data.onClick : handleClick}
      >
        {/* Background image for the card */}
        <div
          className="aspect-square bg-cover rounded-md relative"
          style={{
            backgroundImage: `url(${typeof data.image === 'string' ? data.image : sanityImageUrlBuilder(data.image)})`,
          }}
        >
          {/* Description as overlay text */}
          {data.description != undefined && (
            <>
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 md:group-hover:opacity-100">
                <div className="w-full h-full p-2 overflow-auto bg-black rounded-md flex justify-center items-center transition-opacity duration-300">
                  <div className="text-white">{data.description}</div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Image title */}
        <p>{data.title}</p>
      </div>

      {/* Description in modal for small screens */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeButtonClasses={'hidden'}>
        <div className=" w-full p-2 aspect-square overflow-auto bg-black rounded-md flex">
          <div className="text-white">{data.description}</div>
        </div>
      </Modal>
    </div>
  );
};

export default OverLayCard;
