import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fetchHotelEntries, fetchImageByEntryId } from '../../../api';
import { ContentfulResponse } from '../../../types';
import HotelsScreen from './hotels-screen';

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

function Hotels() {
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

  return (
    <HotelsScreen
      isLoading={isLoading}
      error={error}
      hotelData={hotelData}
      content={content}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      processHotelImages={(index: number) => processHotelImages(index, hotelData, setContent, setIsOpen)}
    />
  );
}

const CharmingHotels = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hotels />
    </QueryClientProvider>
  );
};

export default CharmingHotels;
