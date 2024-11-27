import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHotelEntries, fetchImageByEntryId } from '@api/index';
import { ContentfulResponse } from '@types/index';
import CommonCarousel from '@molecules/carousel/common-carousel';
import Modal from '@molecules/modal';
import DualHeading from '@atoms/heading/dual-heading';
// import BackgroundImageWrapper from '@molecules/common/backgrounds/background-image-wrapper';

// import image from '@assets/branding.png';

interface ContentfulSys {
  id: string;
}

interface CustomContentfulAsset {
  sys: ContentfulSys;
  url?: string;
}

interface HotelFields {
  hotelName: string;
  country: string;
  address: string;
  phone: string;
  hotelImages: CustomContentfulAsset[];
}

interface ContentfulEntry {
  sys: ContentfulSys;
  fields: HotelFields;
}

// Function to fetch and update hotel image URLs
const handleHotelData = async (imagesAssets: CustomContentfulAsset[], indexes: number[]) => {
  for (let i of indexes) {
    if (imagesAssets[i].url) continue;
    imagesAssets[i].url = await fetchImageByEntryId(imagesAssets[i].sys.id);
  }
  return imagesAssets;
};

// Function to process and set hotel data from fetched entries
const processHotelData = async (
  data: ContentfulResponse<ContentfulEntry>,
  setHotelData: React.Dispatch<React.SetStateAction<HotelFields[]>>
) => {
  const processedData = await Promise.all(
    data.items.map(async (item: ContentfulEntry) => {
      const hotelImages = await handleHotelData(item.fields.hotelImages, [0]);
      return {
        ...item.fields,
        hotelImages,
      };
    })
  );
  setHotelData(processedData);
};

// Function to process images for a specific hotel
const processHotelImages = async (
  index: number,
  hotelData: HotelFields[],
  setContent: React.Dispatch<React.SetStateAction<HotelFields | null>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (hotelData && hotelData[index]) {
    const updatedImages = await handleHotelData(hotelData[index].hotelImages, [1, 2, 3]);
    const updatedContent = { ...hotelData[index], hotelImages: updatedImages };

    setContent(updatedContent);
    setIsOpen(true);
  }
};

const CharmingHotels: React.FC = () => {
  const [content, setContent] = useState<HotelFields | null>(null);
  const [hotelData, setHotelData] = useState<HotelFields[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotelEntries,
  });

  useEffect(() => {
    if (data) {
      processHotelData(data, setHotelData);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>An error has occurred: {error.message}</div>;

  const HotelView = ({ data }: { data: HotelFields }) => {
    return (
      <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-4 my-4">
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

  return (
    <div className="max-w-6xl m-auto p-2 md:p-4 my-4">
      <DualHeading>Charming *Hotels*</DualHeading>
      <CommonCarousel
        data={hotelData.map((item, index) => ({
          image: item.hotelImages[0]?.url,
          title: item.hotelName,
          handleClick: () => processHotelImages(index, hotelData, setContent, setIsOpen),
        }))}
      />
      {content && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          customClasses="bg-gray-900 text-white rounded-md border-2 border-orange-500"
        >
          {/* <BackgroundImageWrapper image={image} position='bottom-right' offset='-40px' opacity='0.3'>
            <HotelView data={content} />
          </BackgroundImageWrapper> */}
          <HotelView data={content} />
        </Modal>
      )}
    </div>
  );
};

export default CharmingHotels;
