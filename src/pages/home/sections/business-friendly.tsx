import { useState } from 'react';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BusinessFreindlyFields {
  image: string;
  title: string;
  description: string;
  _id: string;
}

const BusinessFriendly: React.FC<{ data: BusinessFreindlyFields[]; loading; error }> = ({ data, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <Loading />;
  if (error || !data || !data.length) return null;

  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const next = () => setCurrentIndex((i) => Math.min(i + 1, data.length - 1));

  return (
    <div className="w-full max-w-8xl m-auto px-4 py-8">
      <div className="flex flex-col items-end mb-6">
        <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black">
          Business <span className="text-brand-orange">Friendly</span>
        </h2>
        <p className="font-poppins text-lg md:text-2xl text-gray-600 mt-1">Great work-life balance</p>
      </div>

      {/* Mobile: stacked card + image */}
      <div className="block md:hidden">
        <div className="bg-white rounded-[10px] shadow-xl mb-4 p-4 border border-gray-100">
          <h2 className="font-poppins font-semibold text-lg text-black">{data[currentIndex].title}</h2>
          <p className="font-poppins text-sm text-gray-600 mt-1 line-clamp-4">{data[currentIndex].description}</p>
          <a
            href={`blogs/${data[currentIndex]._id}`}
            className="block text-right text-brand-orange font-poppins font-medium text-sm hover:underline mt-2"
          >
            Know more
          </a>
        </div>
        <div className="w-full rounded-[10px] overflow-hidden shadow-lg">
          <img
            src={sanityImageUrlBuilder(data[currentIndex].image).url()}
            alt={data[currentIndex].title}
            className="w-full object-cover block"
            style={{ aspectRatio: '642/489' }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center disabled:opacity-30"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-sm" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex === data.length - 1}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center disabled:opacity-30"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-sm" />
          </button>
        </div>
      </div>

      {/* Desktop: image left 65%, text card overlays right, arrows in px-12 gutter */}
      <div className="hidden md:block relative px-12">
        {/* Image — left-aligned 65% */}
        <div className="w-[65%] rounded-[10px] overflow-hidden shadow-lg">
          <img
            src={sanityImageUrlBuilder(data[currentIndex].image).url()}
            alt={data[currentIndex].title}
            className="w-full object-cover block"
            style={{ aspectRatio: '642/489' }}
          />
        </div>

        {/* Text card — absolute, overlays right portion of image */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[52%] bg-white rounded-[10px] shadow-xl z-10 p-6 flex flex-col gap-2">
          <h2 className="font-poppins font-semibold text-[20px] leading-[30px] text-black">
            {data[currentIndex].title}
          </h2>
          <p className="font-poppins text-[15px] leading-[24px] text-gray-600 line-clamp-5">
            {data[currentIndex].description}
          </p>
          <a
            href={`blogs/${data[currentIndex]._id}`}
            className="self-end text-brand-orange font-poppins font-medium text-sm hover:underline mt-1"
          >
            Know more
          </a>
        </div>

        {/* Left arrow — in px-12 gutter */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-30 hover:shadow-lg transition-all z-20"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700" />
        </button>

        {/* Right arrow — in px-12 gutter */}
        <button
          onClick={next}
          disabled={currentIndex === data.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-30 hover:shadow-lg transition-all z-20"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default BusinessFriendly;
