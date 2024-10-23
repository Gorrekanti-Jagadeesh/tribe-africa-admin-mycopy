import { useState, useEffect } from 'react';
import BrandingModal from '../../../molecules/modals/home-page-modals/branding-modal';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fetchHotelEntries, fetchImageByEntryId } from '../../../api';
import CommonCarousel from '../../../molecules/common-carousel/common-carousel';

const queryClient = new QueryClient();

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

function QueriedHotels() {
  const [content, setContent] = useState<HotelFields | null>(null);
  const [customData, setCustomData] = useState<HotelFields[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotelEntries,
  });

  const customHotelObject = async (imagesAssets: CustomContentfulAsset[], indexes: number[]) => {
    for (let i of indexes) {
      if (imagesAssets[i].url) continue;
      imagesAssets[i].url = await fetchImageByEntryId(imagesAssets[i].sys.id);
    }
    return imagesAssets;
  };

  const processData = async (data: any) => {
    const processedData = await Promise.all(
      data.items.map(async (item: ContentfulEntry) => {
        const hotelImages = await customHotelObject(item.fields.hotelImages, [0]);
        return {
          ...item.fields,
          hotelImages,
        };
      })
    );
    setCustomData(processedData);
  };

  useEffect(() => {
    if (data) {
      processData(data);
    }
  }, [data]);

  const renderContent = async (index: number) => {
    if (customData && customData[index]) {
      const updatedImages = await customHotelObject(customData[index].hotelImages, [1, 2, 3]);
      const updatedContent = { ...customData[index], hotelImages: updatedImages };

      setContent(updatedContent);
      setIsOpen(true);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="max-w-6xl m-auto">
      <h3 className="text-4xl">
        Charming <span className="font-serif text-orange-500">Hotels</span>
      </h3>
      <CommonCarousel
        data={customData.map((item, index) => ({
          image: item.hotelImages[0]?.url,
          title: item.hotelName,
          handleClick: () => renderContent(index),
        }))}
      />
      {content && <BrandingModal isOpen={isOpen} setIsOpen={setIsOpen} modalContent={<HotelView data={content} />} />}
    </div>
  );
}

const HotelView = ({ data }: { data: HotelFields }) => {
  return (
    <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-4">
      <div id="collage" className="flex md:grid md:grid-cols-2 gap-4 md:w-4/6 max-w-xl overflow-auto">
        {data.hotelImages.map((image) => (
          <img src={image.url} alt="" className="aspect-square w-full m-auto rounded-lg min-w-60 md:min-w-0" />
        ))}
      </div>
      <div id="hotel-content" className="flex flex-grow flex-col">
        <h3 className="font-bold text-lg">{data.hotelName}</h3>
        <p className="m-0 p-0 text-sm text-slate-100">{data.country}</p>
        <div className="my-4 ">
          <p>Address: {data.address}</p>
          <p>Phone: {data.phone}</p>
        </div>
        <button className="bg-gray-300 p-4 px-6 text-black ms-auto mt-auto w-fit">Book Hotel</button>
      </div>
    </div>
  );
};

const CharmingHotels = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <QueriedHotels />
      </QueryClientProvider>
    </div>
  );
};

export default CharmingHotels;
