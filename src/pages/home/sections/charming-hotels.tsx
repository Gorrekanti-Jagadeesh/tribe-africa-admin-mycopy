import React, { useState, useEffect } from 'react';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Modal from '@molecules/modal';
import DualHeading from '@atoms/heading/dual-heading';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { Loading } from '@atoms/common/loading';
import OverLayCard from '@atoms/card/overlay-card';

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

const CharmingHotels: React.FC<{ data: HotelFields[]; loading; error }> = ({ data, loading, error }) => {
  const [content, setContent] = useState<HotelFields | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <Loading />;

  if (error) {
    return <>Error fetching data..</>;
  }

  const HotelView = ({ data }: { data: HotelFields }) => {
    return (
      <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-4 my-4">
        <div id="collage" className="flex md:grid md:grid-cols-2 gap-4 md:w-4/6 max-w-xl overflow-auto">
          {data.images.map((image, idx) => (
            <img
              key={idx}
              src={image.asset.url}
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
        data={data
          .filter((each) => each.isCharmingHotel)
          .map((item, index) => {
            return {
              image: item.images[0].asset.url, // Get the URL as a string
              title: item.name,
              onClick: () => {
                setContent(data[index]);
                setIsOpen(true);
              },
            };
          })}
        component={(item) => <OverLayCard data={item} />}
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
