import { useState } from 'react';
import useScreenWidth from '@hooks/useScreenWidth';
import Modal from '@molecules/modal';
import { sanityImageUrlBuilder } from '@api/index';

interface CardDataProps {
  image: string;
  title?: string;
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
      <div
        className="w-full inline-block cursor-pointer group relative"
        onClick={data.onClick ? data.onClick : handleClick}
      >
        {/* Card image — Figma: 424×351 ratio, radius=10 */}
        <div
          className="w-full bg-cover bg-center rounded-[10px] overflow-hidden relative hover:ring-2 hover:ring-brand-orange transition-all duration-200"
          style={{
            backgroundImage: `url(${typeof data.image === 'string' ? data.image : sanityImageUrlBuilder(data.image)})`,
            aspectRatio: '424/351',
          }}
        >
          {data.description != undefined && (
            <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full p-4 bg-black/80 rounded-[10px] flex items-center justify-center">
                <p className="text-white font-poppins text-sm text-center leading-relaxed">{data.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Card title — Figma: 24px Poppins 500 */}
        {data.title && <p className="mt-2 font-poppins font-medium text-xl md:text-2xl truncate">{data.title}</p>}
      </div>

      {/* Mobile modal for description */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeButtonClasses="hidden">
        <div className="w-full p-4 bg-black rounded-[10px] flex">
          <p className="text-white font-poppins text-sm">{data.description}</p>
        </div>
      </Modal>
    </div>
  );
};

export default OverLayCard;
