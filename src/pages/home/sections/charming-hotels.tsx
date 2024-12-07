import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Modal from '@molecules/modal';
import DualHeading from '@atoms/heading/dual-heading';
import sanityClient from '../../../sanityClient';
import { sanityImageUrlBuilder } from '@api/index'; // Assuming you have a utility for this
import { SanityAsset } from '@sanity/image-url/lib/types/types';

interface HotelFields {
  name: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  images: SanityAsset[]; // Array of Sanity image objects
  isCharmingHotel: boolean;
}

const CharmingHotels: React.FC = () => {
  const [content, setContent] = useState<HotelFields | null>(null);
  const [hotelData, setHotelData] = useState<HotelFields[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch hotels from Sanity
  useEffect(() => {
    async function fetchHotels() {
      try {
        const hotels = await sanityClient.fetch(`
          *[_type == "hotel"]{
            name,
            address,
            email,
            country,
            website,
            phone,
            images[] {
              asset->{
                _id,
                url
              }
            },
            isCharmingHotel
          }
        `);
        setHotelData(hotels);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    }
    fetchHotels();
  }, []);

  // Function to handle click on hotel for more details
  const processHotelImages = (index: number) => {
    if (hotelData && hotelData[index]) {
      const updatedContent = hotelData[index];
      setContent(updatedContent);
      setIsOpen(true);
    }
  };

  if (hotelData.length === 0) return <div>Loading...</div>;

  const HotelView = ({ data }: { data: HotelFields }) => {
    return (
      <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-4 my-4">
        <div id="collage" className="flex md:grid md:grid-cols-2 gap-4 md:w-4/6 max-w-xl overflow-auto">
          {data.images.map((image, idx) => (
            <img
              key={idx}
              src={sanityImageUrlBuilder(image).url()}
              alt={`Hotel Image ${idx}`}
              className="aspect-square w-full m-auto rounded-lg min-w-60 md:min-w-0"
            />
          ))}
        </div>
        <div id="hotel-content" className="flex flex-grow flex-col">
          <h3 className="font-bold text-lg">{data.name}</h3>
          <p className="m-0 p-0 text-sm text-slate-100">{data.country}</p>
          <div className="my-4">
            <p>Address: {data.address}</p>
            <p>Phone: {data.phone}</p>
            <p>Email: {data.email}</p>
            <p>Website: {data.website}</p>
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
        data={hotelData
          .filter((each) => each.isCharmingHotel)
          .map((item, index) => {
            console.log(item.images[0].asset.url);
            return {
              image: item.images[0].asset.url, // Get the URL as a string
              title: item.name,
              onClick: () => processHotelImages(index),
            };
          })}
      />

      {content && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          customClasses="bg-gray-900 text-white rounded-md border-2 border-orange-500"
        >
          <HotelView data={content} />
        </Modal>
      )}
    </div>
  );
};

export default CharmingHotels;
