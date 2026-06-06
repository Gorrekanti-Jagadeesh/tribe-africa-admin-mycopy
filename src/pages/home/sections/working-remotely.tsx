import { useState } from 'react';
import { LeftButton, RightButton } from '@molecules/carousel/common-carousel';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';

interface workingRemotelyFields {
  image: string;
  title: string;
  description: string;
  _id: string;
  homeBusinessBlog: string;
  blogType: string;
}

const WorkingRemotely: React.FC<{ data: workingRemotelyFields[]; loading; error }> = ({ data, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <Loading />;
  if (error) return <>Error fetching data..</>;
  if (!data.length) return null;

  return (
    <div className="w-full max-w-8xl m-auto px-4 py-8">
      {/* Figma: "Great For Working Remotely" 64px Rufina, color=#403025 */}
      <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-[#403025] mb-1">
        Great For Working Remotely
      </h2>
      {/* Figma: "Best Digital Nomad Destinations in africa" 24px Poppins 400 */}
      <p className="font-poppins text-2xl text-black mb-6">Best Digital Nomad Destinations in africa</p>

      <div className="relative flex sm:flex-col items-center">
        {/* Two images + text card */}
        <div className="w-full flex flex-col md:flex-row relative items-center gap-4 my-4">
          {/* Text card — Figma: Rectangle 346, white 757×226, radius=10, shadow, no border */}
          <div className="absolute left-0 w-full md:w-3/5 opacity-80 md:opacity-100 bg-white rounded-[10px] shadow-xl z-10">
            {/* Figma card: title 20px Poppins 600, subtitle 16px Poppins 400 */}
            <div className="p-4 md:p-6 flex flex-col gap-2">
              <h2 className="font-poppins font-semibold text-[20px] leading-[30px] text-black">
                {data[currentIndex].title}
              </h2>
              <p className="font-poppins font-normal text-[16px] leading-[24px] text-gray-600 line-clamp-4">
                {data[currentIndex].description}
              </p>
              <a
                href={`blogs/${data[currentIndex]._id}`}
                className="ms-auto text-brand-orange font-poppins font-medium text-sm hover:underline mt-2"
              >
                Know more
              </a>
            </div>
          </div>

          {/* Images — Figma: two 642×489 images side by side, radius=10 */}
          <div className="w-full md:w-3/5 ms-auto overflow-hidden rounded-[10px] shadow-lg -z-0">
            <img
              src={sanityImageUrlBuilder(data[currentIndex].image).url()}
              alt={data[currentIndex].title}
              className="w-full object-cover object-center"
              style={{ aspectRatio: '642/489' }}
            />
          </div>
        </div>

        <LeftButton onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0} />
        <RightButton onClick={() => setCurrentIndex(currentIndex + 1)} disabled={currentIndex === data.length - 1} />
      </div>
    </div>
  );
};

export default WorkingRemotely;
