import { useEffect, useState } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import { LeftButton, RightButton } from '@molecules/carousel/common-carousel';
import sanityClient from '../../../sanityClient';
import { sanityImageUrlBuilder } from '@api/index';
interface BusinessFreindlyFields {
  image: string;
  title: string;
  description: string;
  _id: string;
  homeBusinessBlogs: string;
  blogType: string;
}

const WorkingRemotely: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<BusinessFreindlyFields[]>([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await sanityClient.fetch(`
            *[_type == "blog"]
          `);
        setData(
          data.filter(
            (each: BusinessFreindlyFields) =>
              each.homeBusinessBlogs === 'Business friendly' && each.blogType === 'Business'
          )
        );
        console.log(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    }
    fetchHotels();
  }, []);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (data.length === 0) {
    return <p>Loading...</p>; // Show a loading state while data is being fetched
  }

  return (
    <div className="mx-auto w-full flex flex-col max-w-6xl p-2 md:p-4">
      <div className="ms-auto flex flex-col items-end">
        <DualHeading>Business *Friendly*</DualHeading>
        <p className="mt-2 text-sm text-gray-600">Great work-life balance</p>
      </div>
      <div className="relative flex sm:flex-col items-center">
        {/* Text and Image */}
        <div className="w-full flex flex-col md:flex-row relative items-center m-2 md:m-4">
          {/* Text container */}
          <div className="absolute right-0 w-full h-full md:h-fit max-h-full md:w-3/5 md:mb-0 opacity-65 md:opacity-100 text-white bg-black md:text-black md:bg-white rounded-lg shadow-lg border border-orange-500">
            <div className="p-2 md:p-6 w-full h-full flex flex-col">
              <div className="flex-grow max-h-48 h-full overflow-hidden">
                <h2 className="text-xl font-semibold mb-2">{data[currentIndex].title}</h2>
                <p className="md:text-gray-600 line-clamp-4">{data[currentIndex].description}</p>
              </div>
              <a href={`blogs/${data[currentIndex]._id}`} className="ms-auto text-blue-500">
                Know more
              </a>
            </div>
          </div>

          {/* Image container */}
          <div className=" w-full md:w-3/5 overflow-hidden rounded-lg shadow-lg -z-10">
            <img
              src={sanityImageUrlBuilder(data[currentIndex].image)}
              alt={data[currentIndex].title}
              className="h-64 md:h-80 lg:h-96 w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Left Arrow */}
        <LeftButton onClick={handlePrev} disabled={currentIndex === 0} />

        {/* Right Arrow */}
        <RightButton onClick={handleNext} disabled={currentIndex === data.length - 1} />
      </div>
    </div>
  );
};

export default WorkingRemotely;
