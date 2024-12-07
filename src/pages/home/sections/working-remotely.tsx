import { useEffect, useState } from 'react';
import DualHeading from '@atoms/heading/dual-heading';
import { LeftButton, RightButton } from '@molecules/carousel/common-carousel';
import sanityClient from '../../../sanityClient';
import { sanityImageUrlBuilder } from '@api/index';
interface workingRemotelyFields {
  image: string;
  title: string;
  description: string;
  _id: string;
  homeBusinessBlogs: string;
  blogType: string;
}

const WorkingRemotely: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [landingData, setLandingData] = useState<workingRemotelyFields[]>([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await sanityClient.fetch(`
            *[_type == "blog"]
          `);
        setLandingData(
          data.filter(
            (each: workingRemotelyFields) =>
              each.homeBusinessBlogs === 'Working Remotely' && each.blogType === 'Business'
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
    if (currentIndex < landingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (landingData.length === 0) {
    return <p>Loading...</p>; // Show a loading state while data is being fetched
  }

  return (
    <div className="w-full max-w-6xl m-auto p-2 md:p-4">
      <div>
        <DualHeading>Great For *Working Remotely*</DualHeading>
        <p className="mt-2 text-sm text-gray-600">Best digital Nomad Destinations in Africa</p>
      </div>
      <div className="relative flex sm:flex-col items-center">
        {/* Text and Image */}
        <div className="w-full flex flex-col md:flex-row relative items-center m-2 md:m-4">
          {/* Text container */}
          <div className="absolute left-0 w-full h-full md:h-fit md:w-3/5 md:mb-0 opacity-65 md:opacity-100 text-white bg-black md:text-black md:bg-white rounded-lg shadow-lg border border-orange-500">
            <div className="p-2 md:p-6 w-full h-full flex flex-col">
              <div className="flex-grow max-h-48 h-full overflow-hidden">
                <h2 className="text-xl font-semibold mb-2">{landingData[currentIndex].title}</h2>
                <p className="md:text-gray-600 line-clamp-4">{landingData[currentIndex].description}</p>
              </div>
              <a href={`blogs/${landingData[currentIndex]._id}`} className="ms-auto text-blue-500">
                Know more
              </a>
            </div>
          </div>

          {/* Image container */}
          <div className=" w-full md:w-3/5 ms-auto overflow-hidden rounded-lg shadow-lg -z-10">
            <img
              src={sanityImageUrlBuilder(landingData[currentIndex].image)}
              alt={landingData[currentIndex].title}
              className="h-64 md:h-80 lg:h-96 w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Left Arrow */}
        <LeftButton onClick={handlePrev} disabled={currentIndex === 0} />

        {/* Right Arrow */}
        <RightButton onClick={handleNext} disabled={currentIndex === landingData.length - 1} />
      </div>
    </div>
  );
};

export default WorkingRemotely;
