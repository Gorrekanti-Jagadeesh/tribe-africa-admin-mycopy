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

      <div className="relative">
        {/* Mobile: text card above image; Desktop: text card overlays left side of image */}
        <div className="w-full my-4">
          {/* Mobile text card (visible only on < md) */}
          <div className="block md:hidden bg-white rounded-[10px] shadow-xl mb-4 p-4">
            <h2 className="font-poppins font-semibold text-lg text-black">{data[currentIndex].title}</h2>
            <p className="font-poppins text-sm text-gray-600 mt-1 line-clamp-4">{data[currentIndex].description}</p>
            <a
              href={`blogs/${data[currentIndex]._id}`}
              className="ms-auto block text-right text-brand-orange font-poppins font-medium text-sm hover:underline mt-2"
            >
              Know more
            </a>
          </div>

          {/* Image + desktop overlay */}
          <div className="relative w-full overflow-hidden rounded-[10px] shadow-lg">
            <img
              src={sanityImageUrlBuilder(data[currentIndex].image).url()}
              alt={data[currentIndex].title}
              className="w-full object-cover object-center"
              style={{ aspectRatio: '642/489' }}
            />
            {/* Desktop text overlay — hidden on mobile */}
            <div className="hidden md:block absolute left-0 top-0 h-full w-3/5 p-6 flex flex-col justify-center bg-white/90 rounded-l-[10px]">
              <div className="flex flex-col gap-2">
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
          </div>
        </div>

        {/* Nav arrows — pushed outside content with negative margin on desktop */}
        <div className="flex justify-between mt-4 gap-4 md:absolute md:bottom-1/2 md:translate-y-1/2 md:w-full md:pointer-events-none">
          <div className="md:pointer-events-auto md:-translate-x-8">
            <LeftButton onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0} />
          </div>
          <div className="md:pointer-events-auto md:translate-x-8">
            <RightButton
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={currentIndex === data.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingRemotely;
