import React from 'react';
import BrandingModal from '../../../molecules/modals/home-page-modals/BrandingModal';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

const SPACE_ID = '4b35ixzkzcwg';
const ACCESS_TOKEN = '0dMnG2k9dSYnFw9bLX52eWPj9opUAyyczsqzY_haxLs';

// Define Contentful Entry and Asset types
interface ContentfulSys {
  id: string;
}

interface ContentfulAsset {
  sys: ContentfulSys;
}

interface HotelFields {
  hotelName: string;
  country: string;
  address: string;
  phone: string;
  hotelImages: ContentfulAsset[];
}

interface ContentfulEntry {
  sys: ContentfulSys;
  fields: HotelFields;
}

interface ContentfulResponse {
  items: ContentfulEntry[];
}

// Fetch function to get data from Contentful
const fetchContentfulEntries = async (): Promise<ContentfulResponse> => {
  try {
    const response = await axios.get(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data; // Return the JSON data
  } catch (error) {
    throw new Error('Failed to fetch data from Contentful');
  }
};

// Fetch function to get image URL from Contentful
const fetchImage = async (imageId: string): Promise<string> => {
  const response = await axios.get(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/assets/${imageId}?access_token=${ACCESS_TOKEN}`
  );

  return 'https:' + response.data.fields.file.url; // Return the image URL
};

function QueriedHotels() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchContentfulEntries,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>An error has occurred: {error.message}</div>;

  return (
    // TODO: Carousel needs to be applied for the container
    <div className=" max-w-6xl m-auto ">
      <h3 className="text-4xl">
        Charming <span className="font-serif text-orange-500">Hotels</span>
      </h3>
      <div className="flex overflow-auto">
        {data && data.items.map((item: ContentfulEntry) => <Hotel key={item.sys.id} data={item} />)}
      </div>
    </div>
  );
}

// Change to a React component and handle async image fetching
const Hotel = ({ data }: { data: ContentfulEntry }) => {
  const [hotelData, setHotelData] = React.useState<{
    name: string;
    country: string;
    address: string;
    phone: string;
    images: string[];
  } | null>(null);

  React.useEffect(() => {
    const fetchHotelData = async () => {
      const images = await Promise.all(data.fields.hotelImages.map((image) => fetchImage(image.sys.id)));

      setHotelData({
        name: data.fields.hotelName,
        country: data.fields.country,
        address: data.fields.address,
        phone: data.fields.phone,
        images,
      });
    };
    fetchHotelData();
  }, [data]);

  if (!hotelData) return <div>Loading hotel data...</div>;

  return <BrandingModal trigger={<HotelCard data={hotelData} />} modalContent={<HotelView data={hotelData} />} />;
};

// Rectified types for HotelCard and HotelView
const HotelCard = ({ data }: { data: { name: string; images: string[] } }) => {
  return (
    <div id="hotels" className="m-2 z-0">
      <div className="w-fit inline-block">
        <div
          className="aspect-square bg-cover rounded-md"
          style={{
            width: '200px',
            backgroundImage: `url(${data.images[0]})`,
          }}
        ></div>
        <p>{data.name}</p>
      </div>
    </div>
  );
};

const HotelView = ({
  data,
}: {
  data: { name: string; country: string; address: string; phone: string; images: string[] };
}) => {
  return (
    <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-4">
      <div id="collage" className="flex md:grid gap-4 md:w-4/6 max-w-xl overflow-auto">
        <div className="flex gap-4 w-fit">
          <img
            src={data.images[0]}
            alt=""
            className="aspect-square m-auto rounded-lg min-w-60 md:min-w-0"
            style={{ width: 'calc(50% - 20px)' }}
          />
          <img
            src={data.images[1]}
            alt=""
            className="aspect-square m-auto rounded-lg min-w-60 md:min-w-0"
            style={{ width: 'calc(50% - 20px)' }}
          />
        </div>
        <div className="flex gap-4 w-fit">
          <img
            src={data.images[2]}
            alt=""
            className="aspect-square m-auto rounded-lg min-w-60 md:min-w-0"
            style={{ width: 'calc(50% - 20px)' }}
          />
          <img
            src={data.images[3]}
            alt=""
            className="aspect-square m-auto rounded-lg min-w-60 md:min-w-0"
            style={{ width: 'calc(50% - 20px)' }}
          />
        </div>
      </div>
      <div id="hotel-content" className="flex flex-grow flex-col">
        <h3 className="font-bold text-lg">{data.name}</h3>
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
