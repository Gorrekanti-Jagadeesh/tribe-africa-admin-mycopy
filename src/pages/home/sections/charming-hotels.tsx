import React, { useState } from 'react';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Modal from '@molecules/modal';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { Loading } from '@atoms/common/loading';
import OverLayCard from '@atoms/card/overlay-card';
import { useNavigate } from 'react-router-dom';

interface HotelFields {
  name: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  images: SanityAsset[];
  isCharmingHotel: boolean;
}

const CharmingHotels: React.FC<{ data: HotelFields[]; loading; error }> = ({ data, loading, error }) => {
  const [content, setContent] = useState<HotelFields | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <>Error fetching data..</>;

  const HotelView = ({ data }: { data: HotelFields }) => {
    return (
      <div id="hotel-view" className="grid justify-center md:flex gap-4 p-2 md:p-6 my-4">
        <div id="collage" className="flex md:grid md:grid-cols-2 gap-4 md:w-4/6 max-w-xl overflow-auto">
          {data.images.map((image, idx) => (
            <img
              key={idx}
              src={image.asset.url}
              alt={`Hotel Image ${idx}`}
              className="aspect-square w-full m-auto rounded-[10px] min-w-60 md:min-w-0 object-cover"
            />
          ))}
        </div>
        <div id="hotel-content" className="flex flex-grow flex-col gap-3">
          <h3 className="font-poppins font-bold text-2xl">{data.name}</h3>
          <p className="text-sm text-slate-100">{data.country}</p>
          <div className="space-y-1 text-sm">
            <p>Address: {data.address}</p>
            <p>Phone: {data.phone}</p>
            <p>Email: {data.email}</p>
            <p>Website: {data.website}</p>
          </div>
          <button className="bg-brand-orange text-white font-poppins font-semibold px-8 py-3 rounded-[10px] ms-auto mt-auto w-fit hover:bg-[#E05A00] transition-colors">
            Book Hotel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-8xl m-auto px-4 py-8">
      {/* Figma: "Charming Hotels" 64px Rufina black + "List Your Accommodation" orange CTA */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black">
          Charming Hotels
        </h2>
        <button
          onClick={() => navigate('/form')}
          className="bg-brand-orange text-white font-poppins font-semibold text-lg md:text-2xl px-8 md:px-10 py-3 md:py-4 rounded-[10px] hover:bg-[#E05A00] transition-colors shrink-0"
        >
          List Your Accommodation
        </button>
      </div>

      {/* Carousel — Figma: 3 cards each 420×380, radius=10 */}
      <CommonCarousel
        data={data
          .filter((each) => each.isCharmingHotel)
          .map((item, index) => ({
            image: item.images[0].asset.url,
            title: item.name,
            onClick: () => {
              setContent(data[index]);
              setIsOpen(true);
            },
          }))}
        component={(item) => (
          <div className="px-1">
            <div
              className="w-full rounded-[10px] overflow-hidden bg-cover bg-center cursor-pointer hover:ring-2 hover:ring-brand-orange transition-all"
              style={{ backgroundImage: `url(${item.image})`, height: '380px' }}
              onClick={item.onClick}
            />
            <p className="mt-2 font-poppins font-normal text-2xl truncate">{item.title}</p>
          </div>
        )}
      />

      {content && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          customClasses="bg-gray-900 text-white rounded-[10px] border-2 border-brand-orange"
        >
          <HotelView data={content} />
        </Modal>
      )}
    </div>
  );
};

export default CharmingHotels;
