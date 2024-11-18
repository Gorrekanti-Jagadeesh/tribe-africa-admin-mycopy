import React from 'react';
import CommonCarousel from '../../../molecules/carousel/common-carousel';
import Modal from '../../../molecules/modal';
import BrandingCorner from '../../../molecules/common/backgrounds/branding-background';
import DualHeading from '../../../atoms/heading/dual-heading';

interface CustomContentfulAsset {
  url?: string;
}

interface HotelFields {
  hotelName: string;
  country: string;
  address: string;
  phone: string;
  hotelImages: CustomContentfulAsset[];
}

interface HotelsScreenProps {
  isLoading: boolean;
  error: unknown;
  hotelData: HotelFields[];
  content: HotelFields | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  processHotelImages: (index: number) => void;
}

const HotelView = ({ data }: { data: HotelFields }) => {
  return (
    <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-4">
      <div id="collage" className="flex md:grid md:grid-cols-2 gap-4 md:w-4/6 max-w-xl overflow-auto">
        {data.hotelImages.map((image, idx) => (
          <img
            key={idx}
            src={image.url}
            alt=""
            className="aspect-square w-full m-auto rounded-lg min-w-60 md:min-w-0"
          />
        ))}
      </div>
      <div id="hotel-content" className="flex flex-grow flex-col">
        <h3 className="font-bold text-lg">{data.hotelName}</h3>
        <p className="m-0 p-0 text-sm text-slate-100">{data.country}</p>
        <div className="my-4">
          <p>Address: {data.address}</p>
          <p>Phone: {data.phone}</p>
        </div>
        <button className="bg-gray-300 p-4 px-6 text-black ms-auto mt-auto w-fit">Book Hotel</button>
      </div>
    </div>
  );
};

const HotelsScreen: React.FC<HotelsScreenProps> = ({
  isLoading,
  error,
  hotelData,
  content,
  isOpen,
  setIsOpen,
  processHotelImages,
}) => {
  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="max-w-6xl m-auto p-2 md:p-4 my-4">
      <DualHeading>Charming *Hotels*</DualHeading>
      <CommonCarousel
        data={hotelData.map((item, index) => ({
          image: item.hotelImages[0]?.url,
          title: item.hotelName,
          handleClick: () => processHotelImages(index),
        }))}
      />
      {content && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          customClasses="bg-gray-900 text-white rounded-md border-2 border-orange-500"
        >
          <BrandingCorner>
            <HotelView data={content} />
          </BrandingCorner>
        </Modal>
      )}
    </div>
  );
};

export default HotelsScreen;
