import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';
import { CommonCarousel } from '@molecules/carousel/common-carousel';
import Modal from '@molecules/modal';
import AdvertisementForm from '@molecules/forms/advertisement-form';
import { useNavigate } from 'react-router-dom';

interface serviceDataFields {
  service: string;
  image: SanityAsset[];
  location: string;
}

const Services: React.FC<{ data: serviceDataFields[]; loading; error }> = ({ data, loading, error }) => {
  const [isAdOpen, setIsAdOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error || !data || !data.length) return null;

  return (
    <div className="max-w-8xl m-auto px-4 py-8">
      <Modal isOpen={isAdOpen} setIsOpen={setIsAdOpen} containerClasses="ms-auto">
        <AdvertisementForm />
      </Modal>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black">
          Premier <span className="text-brand-orange">Services</span>
        </h2>
        <Button className="shrink-0 text-lg md:text-2xl px-8 md:px-10 py-3 md:py-4" onClick={() => setIsAdOpen(true)}>
          Advertise with Us
        </Button>
      </div>

      <CommonCarousel
        data={data}
        component={(services) => (
          <div className="px-1" key={services._id}>
            <div
              className="w-full bg-cover bg-center rounded-[10px] overflow-hidden"
              style={{
                backgroundImage: `url(${sanityImageUrlBuilder(services?.image).url()})`,
                aspectRatio: '4/3',
              }}
            />
            <div className="mt-2">
              <h6 className="font-poppins font-semibold text-base">{services.service}</h6>
              <p className="font-poppins text-sm text-gray-500">{services.location}</p>
            </div>
          </div>
        )}
      />

      {/* "List your business" CTA — Figma: black bg, orange border, orange button */}
      <div id="add-service" className="mt-8 animate-on-scroll">
        <div className="bg-black border-2 border-brand-orange rounded-[10px] text-white text-center py-14 px-8 grid gap-4">
          <h4 className="font-poppins font-bold text-xl">Want to List your business on Tribe Africa pages?</h4>
          <p className="font-poppins text-sm text-gray-300">List your business and get massive traffic!</p>
          <button
            className="font-poppins font-semibold px-6 py-3 bg-brand-orange rounded-[10px] text-white m-auto hover:bg-[#E05A00] transition-colors"
            style={{ width: 'fit-content' }}
            onClick={() => navigate('/business-form')}
          >
            List your business
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
