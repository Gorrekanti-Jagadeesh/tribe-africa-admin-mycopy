import CustomSectionHeadingComponent from '../../../atoms/custom-section-heading/custom-section-heading-component';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface wokingRemotelyCarouselProps {
  carouselData: CarouselItem[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const WorkingRemotelyScreen: React.FC<wokingRemotelyCarouselProps> = ({
  carouselData,
  currentIndex,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="container mx-auto w-full max-w-6xl p-2 md:p-4">
      <CustomSectionHeadingComponent
        title="Great For"
        subPartTitle="Working Remotely"
        showButton={false}
        description="Best degital Nomand Destinations in aftrica"
        containerStyles=""
        titleStyles="font-[Poppins]"
        subTitleStyles="text-[#FF6600] font-[Rufina]"
      />
      <div className="relative flex sm:flex-col items-center">
        {/* Left Arrow */}
        <button
          className={`absolute left-0 md:-left-2 lg:-left-7 top-2/3 md:top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20 border w-12 h-12 md:w-16 md:h-16 border-slate-300 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          {/* ◀ */}
          <span className="text-4xl leading-6">&#8249;</span>
        </button>

        {/* Text and Image */}
        <div className="w-full flex flex-col md:flex-row relative items-center">
          {/* Text container */}
          <div className="w-full mb-3 relative z-10 bg-white rounded-lg shadow-lg md:max-w-md">
            <div className="bg-white p-8 pl-10 rounded-lg shadow-lg w-full md:max-w-[53rem] md:w-[130%]">
              <h2 className="text-xl font-semibold mb-2">{carouselData[currentIndex].title}</h2>
              <p className="text-gray-600">{carouselData[currentIndex].description}</p>
            </div>
          </div>

          {/* Image container */}
          <div className="w-full relative overflow-hidden rounded-lg shadow-lg border border-slate-300">
            <img
              src={carouselData[currentIndex].image}
              alt={carouselData[currentIndex].title}
              className="h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className={`absolute  right-0 md:-right-2 lg:-right-7 top-2/3 md:top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full w-12 h-12 md:w-16 md:h-16 shadow-lg border border-slate-300 ${
            currentIndex === carouselData.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleNext}
          disabled={currentIndex === carouselData.length - 1}
        >
          {/* ▶ */}
          <span className="text-4xl leading-6">&#8250;</span>
        </button>
      </div>
    </div>
  );
};
export default WorkingRemotelyScreen;
