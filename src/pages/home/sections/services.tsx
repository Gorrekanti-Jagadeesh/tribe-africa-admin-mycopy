import DualHeading from '@atoms/heading/dual-heading';
import Button from '@atoms/custom-button/button';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';

interface serviceDataFields {
  service: string;
  image: SanityAsset[]; // Array of Sanity image objects
  location: string;
}

const Services: React.FC<{ data: serviceDataFields[]; loading; error }> = ({ data, loading, error }) => {
  if (!data || loading) {
    return <Loading />;
  }

  if (error) {
    return <>Error fetching data..</>;
  }

  return (
    <div className="grid gap-2 mb-4 max-w-6xl m-auto p-2 md:p-4">
      <div className="flex">
        <DualHeading>Premier *Services*</DualHeading>
        <Button className="ms-auto">Advertise with Us</Button>
      </div>
      <div id="services-container" className=" animate-on-scroll overflow-x-auto whitespace-nowrap">
        {/* Cards */}
        {data.map((services, index) => (
          <div className="my-4 w-5/6 md:w-2/5 lg:w-1/3 p-2 max-w-full inline-block" key={index}>
            <div className="border-2 border-gray-300 p-2 rounded" style={{ aspectRatio: '4/3' }}>
              <div
                className="relative bg-cover bg-center p-2 w-full h-full"
                style={{ backgroundImage: `url(${sanityImageUrlBuilder(services?.image).url()})` }}
              ></div>
            </div>
            <div>
              <h6 className="font-semibold">{services.service}</h6>
              <p className="text-sm">{services.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div id="add-service" className=" animate-on-scroll">
        <div className="bg-black border-2 border-orange-500 rounded-md text-white text-center p-12 grid">
          <h4 className=" text-lg font-bold mb-3">Want to List your business on Tribe Africa pages?</h4>
          <p className="text-sm text-gray-200 mb-2">List your business and get massive traffic !</p>
          <button className="px-4 py-2 bg-orange-500 rounded-md text-white m-auto" style={{ width: 'fit-content' }}>
            List your business
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
